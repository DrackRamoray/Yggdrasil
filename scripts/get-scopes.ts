import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { default as glob } from 'fast-glob';

const getScopes = (current?: string) => {
  const pkgs = glob.sync('apps/!(node_modules)/package.json');
  const scopes = pkgs.map((pkgPath) => {
    const str = readFileSync(join(current || cwd(), pkgPath), 'utf-8');
    const pkg = JSON.parse(str);

    return pkg.name.startsWith('@') ? pkg.name.split('/')[1] : pkg.name;
  });
  scopes.push('*');

  return scopes;
};

export default getScopes;
