import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import { cwd, exit } from 'node:process';
import { fileURLToPath } from 'node:url';
import { red } from 'kolorist';
import { PkgDir, PkgPrefix, PkgType } from '../constants';

export const getTemplateDir = (template: PkgType) => {
  return resolve(
    fileURLToPath(import.meta.url),
    '../../..',
    `template-${template.toLowerCase()}`,
  );
};

export const getTargetDir = (template: PkgType, packageName: string) => {
  return resolve(cwd(), PkgDir[template], packageName);
};

export const ensureDirIsExist = (dir: string) => {
  if (existsSync(dir)) {
    console.log(red(`\n${dir} is already exist.\n`));
    exit(1);
  }

  mkdirSync(dir, { recursive: true });
};

export const readPackageJson = (src: string) => {
  return JSON.parse(readFileSync(join(src, 'package.json'), 'utf8'));
};

export const readRootPackageJson = () => {
  return readPackageJson(cwd());
};

export const readdir = (src: string) => {
  return readdirSync(src);
};

export const write = (dst: string, entry: string, content: string) => {
  const targetEntry = join(dst, renameEntry(entry));

  writeFileSync(targetEntry, content);
};

export const writePackageJson = (
  src: string,
  content: Record<string, unknown>,
) => {
  write(src, 'package.json', `${JSON.stringify(content, null, 2)}\n`);
};

export const appendScriptsToRootPackage = (
  template: PkgType,
  packageName: string,
) => {
  if (template !== PkgType.App) {
    return;
  }

  const name = `${PkgPrefix[template]}${packageName}`;
  const rootPkg = readRootPackageJson();
  const scripts = {
    ...rootPkg.scripts,
    [`dev:${name}`]: `turbo dev --filter=${name}`,
    [`build:${name}`]: `turbo build --filter=${name}`,
  };
  const scriptKeys = Object.keys(scripts).sort();

  rootPkg.scripts = scriptKeys.reduce(
    (acc, key) => ({ ...acc, [key]: scripts[key] }),
    {},
  );

  writePackageJson(cwd(), rootPkg);
};

export const writeREADME = (src: string, content: string) => {
  write(src, 'README.md', content);
};

export const copy = (src: string, dst: string, entry: string) => {
  const srcEntry = join(src, entry);
  const dstEntry = join(dst, renameEntry(entry));

  doCopy(srcEntry, dstEntry);
};

function doCopy(src: string, dst: string) {
  const stat = statSync(src);

  if (stat.isDirectory()) {
    copyDir(src, dst);
  } else {
    copyFileSync(src, dst);
  }
}

function copyDir(src: string, dst: string) {
  mkdirSync(dst, { recursive: true });

  const entries = readdirSync(src);

  entries.forEach((entry) => {
    const srcEntry = resolve(src, entry);
    const dstEntry = resolve(dst, entry);
    doCopy(srcEntry, dstEntry);
  });
}

function renameEntry(entry: string) {
  return entry.startsWith('_') ? entry.replace(/^_/, '.') : entry;
}
