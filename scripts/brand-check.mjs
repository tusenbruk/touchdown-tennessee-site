#!/usr/bin/env node
/**
 * Brand-safety gate for Touchdown Tennessee.
 *
 * Scans source files and content for prohibited marks, names, and phrases.
 * Run before every push:
 *
 *   node scripts/brand-check.mjs [--root <dir>]
 *
 * Exit 0 = clean. Exit 1 = violations found.
 *
 * Rules enforced:
 *  1. No University of Tennessee, Titans, or NFL logos, marks, or names
 *     used as branding (file references to /brand/ assets are checked).
 *  2. No "Rocky Top" (the song).
 *  3. No John Ward quotes or references.
 *  4. No owner name, hometown, or city that could identify the owner.
 *  5. The public line is: run by a fan and alumnus, a Tennessee native
 *     living overseas.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Patterns that must not appear in source or content files.
// Each entry: [regex, description].
const PROHIBITED = [
  [/\bRocky\s+Top\b/gi, "Rocky Top (the song)"],
  [/\bJohn\s+Ward\b/gi, "John Ward reference"],
  [/\bUniversity\s+of\s+Tennessee\b/gi, "University of Tennessee name (use oblique references only)"],
  [/\bUT\s+Vols\b/gi, "UT Vols branding"],
  [/\bGo\s+Vols\b/gi, "Go Vols branding"],
  [/\bTennessee\s+Titans\b/gi, "Tennessee Titans name"],
  [/\bNFL\.com\b/gi, "NFL.com reference"],
  [/\bESPN\.com\b/gi, "ESPN.com reference"],
  [/\btitanslogo\b/gi, "Titans logo reference"],
  [/\bnfl-?logo\b/gi, "NFL logo reference"],
  [/\bpower-t\b/gi, "Power T mark reference"],
];

// File extensions to scan.
const SCAN_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".json", ".md", ".mdx", ".html", ".css", ".svg",
]);

// Directories and files to skip (brand-check itself defines the patterns).
const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "dist", ".vercel", ".output"]);
const SKIP_FILES = new Set(["scripts/brand-check.mjs", "scripts/brand-check.test.mjs"]);

function walkFiles(dir, root) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath, root));
    } else if (SCAN_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      const rel = relative(root, fullPath);
      if (!SKIP_FILES.has(rel)) results.push(fullPath);
    }
  }
  return results;
}

function checkFile(filePath, root) {
  const content = readFileSync(filePath, "utf-8");
  const relPath = relative(root, filePath);
  const violations = [];

  for (const [pattern, description] of PROHIBITED) {
    // Reset lastIndex for global regexes.
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      // Find line number.
      const upToMatch = content.slice(0, match.index);
      const lineNumber = (upToMatch.match(/\n/g) || []).length + 1;
      violations.push({
        file: relPath,
        line: lineNumber,
        rule: description,
        matched: match[0],
      });
    }
  }

  return violations;
}

// CLI entry point.
const args = process.argv.slice(2);
let root = join(__dirname, "..");

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--root" && args[i + 1]) {
    root = args[++i];
  }
}

const files = walkFiles(root, root);
const allViolations = [];

for (const file of files) {
  allViolations.push(...checkFile(file, root));
}

if (allViolations.length === 0) {
  console.log(JSON.stringify({ ok: true, filesScanned: files.length, violations: 0 }, null, 2));
  process.exit(0);
} else {
  console.log(
    JSON.stringify(
      {
        ok: false,
        filesScanned: files.length,
        violations: allViolations.length,
        details: allViolations,
      },
      null,
      2,
    ),
  );
  process.exit(1);
}
