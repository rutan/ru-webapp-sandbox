#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

function parseJSONC(jsoncText: string) {
  let text = jsoncText.replace(/\/\*[\s\S]*?\*\//g, '');
  text = text.replace(/(^|\s)\/\/.*$/gm, '$1');
  text = text.replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(text);
}

function getDatabaseName(bindingWanted = 'DB') {
  const conf: {
    d1_databases?: Array<{ binding: string; database_name: string }>;
  } = parseJSONC(readFileSync('wrangler.jsonc', 'utf8'));

  const list = Array.isArray(conf?.d1_databases) ? conf.d1_databases : [];
  if (list.length === 0) {
    console.error('[d1.js] No d1_databases defined in wrangler.jsonc');
    process.exit(1);
  }

  const entry = list.find((d) => d?.binding === bindingWanted) ?? list[0];
  if (!entry?.database_name) {
    console.error('[d1.js] Target D1 entry missing database_name in wrangler.jsonc');
    process.exit(1);
  }

  return entry.database_name;
}

function buildArgs(dbName: string) {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    console.error('Usage: node scripts/d1.ts <subcommand...> [--options]');
    console.error('  e.g. node scripts/d1.ts migrations apply --local');
    process.exit(1);
  }

  const sub: string[] = [];
  const rest: string[] = [];

  let optionsPhase = false;
  for (const a of argv) {
    if (!optionsPhase && a.startsWith('-')) optionsPhase = true;
    (optionsPhase ? rest : sub).push(a);
  }

  return ['d1', ...sub, dbName, ...rest];
}

(() => {
  const binding = process.env.D1_BINDING || 'DB';
  const dbName = getDatabaseName(binding);
  const args = buildArgs(dbName);
  const cmd = process.platform === 'win32' ? 'wrangler.cmd' : 'wrangler';
  const res = spawnSync(cmd, args, { stdio: 'inherit' });
  if (res.error) {
    console.error('[d1.js] Failed to run wrangler:', res.error.message);
    process.exit(1);
  }
  process.exit(res.status ?? 0);
})();
