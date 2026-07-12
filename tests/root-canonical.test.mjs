import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT_CANONICAL = 'https://www.orionaimedia.com';

function renderedCanonicalHrefs(html) {
    const head = html.match(/<head(?:\s[^>]*)?>([\s\S]*?)<\/head>/i);
    assert(head, 'rendered HTML is missing a head element');
    const activeHead = head[1]
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi, '');

    return [
        ...activeHead.matchAll(
            /<link\s+rel\s*=\s*["']canonical["']\s+href\s*=\s*["']([^"']+)["']\s*\/?>/gi
        )
    ].map((match) => match[1]);
}

function objectProperty(object, name, fileName) {
    assert.equal(
        object.properties.filter((property) => ts.isSpreadAssignment(property)).length,
        0,
        `${fileName} metadata contract cannot contain spreads`
    );
    assert.equal(
        object.properties.filter(
            (property) => property.name && ts.isComputedPropertyName(property.name)
        ).length,
        0,
        `${fileName} metadata contract cannot contain computed properties`
    );
    const properties = object.properties.filter(
        (candidate) => ts.isPropertyAssignment(candidate)
            && (ts.isIdentifier(candidate.name) || ts.isStringLiteral(candidate.name))
            && candidate.name.text === name
    );
    assert.equal(properties.length, 1, `${fileName} metadata must declare ${name} exactly once`);
    return properties[0];
}

function exportedMetadataCanonical(source, fileName) {
    const sourceFile = ts.createSourceFile(
        fileName,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
    );
    const metadataStatement = sourceFile.statements.find(
        (statement) => ts.isVariableStatement(statement)
            && statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
            && statement.declarationList.declarations.some(
                (declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === 'metadata'
            )
    );
    assert(metadataStatement && ts.isVariableStatement(metadataStatement), `${fileName} is missing exported metadata`);

    const metadataDeclaration = metadataStatement.declarationList.declarations.find(
        (declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === 'metadata'
    );
    assert(
        metadataDeclaration?.initializer && ts.isObjectLiteralExpression(metadataDeclaration.initializer),
        `${fileName} metadata must be an object literal`
    );

    const alternates = objectProperty(metadataDeclaration.initializer, 'alternates', fileName);
    assert(ts.isObjectLiteralExpression(alternates.initializer), `${fileName} alternates must be an object literal`);
    const canonical = objectProperty(alternates.initializer, 'canonical', fileName);
    assert(ts.isStringLiteral(canonical.initializer), `${fileName} canonical must be a string literal`);
    return canonical.initializer.text;
}

test('the root canonical declarations and rendered value agree', async () => {
    assert.deepEqual(
        renderedCanonicalHrefs(`<head><link rel = "canonical" href = "${ROOT_CANONICAL}"></head>`),
        [ROOT_CANONICAL]
    );
    assert.deepEqual(
        renderedCanonicalHrefs(`<head><link data-rel = "canonical" data-href = "${ROOT_CANONICAL}"></head>`),
        []
    );
    assert.deepEqual(
        renderedCanonicalHrefs(`<head><link-card rel="canonical" href="${ROOT_CANONICAL}"></head>`),
        []
    );
    assert.deepEqual(
        renderedCanonicalHrefs(`<head><link data-x=' rel="canonical" href="${ROOT_CANONICAL}"'></head>`),
        []
    );
    assert.deepEqual(
        renderedCanonicalHrefs(`<head><!-- <link rel="canonical" href="${ROOT_CANONICAL}"> --></head>`),
        []
    );
    assert.deepEqual(
        renderedCanonicalHrefs(`<head><script>"<link rel='canonical' href='${ROOT_CANONICAL}'>"</script></head>`),
        []
    );
    assert.deepEqual(
        renderedCanonicalHrefs(`<head></head><body><link rel="canonical" href="${ROOT_CANONICAL}"></body>`),
        []
    );

    const sourceFiles = ['app/layout.tsx', 'app/page.tsx'];
    const sourceCanonicals = await Promise.all(sourceFiles.map(async (fileName) => (
        exportedMetadataCanonical(
            await readFile(path.join(REPO_ROOT, fileName), 'utf8'),
            fileName
        )
    )));

    assert.deepEqual(sourceCanonicals, [ROOT_CANONICAL, ROOT_CANONICAL]);

    const html = await readFile(path.join(REPO_ROOT, '.next/server/app/index.html'), 'utf8');
    assert.deepEqual(renderedCanonicalHrefs(html), [ROOT_CANONICAL]);
});
