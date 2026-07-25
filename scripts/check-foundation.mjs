import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (path) =>
  JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const readText = (path) => readFileSync(resolve(root, path), 'utf8');

const registry = readJson('registry.json');
const components = readJson('components.json');
const packageJson = readJson('package.json');
const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

assert(
  components.style === 'radix-nova',
  'components.json must use the radix-nova style.'
);
assert(
  components.registries?.['@rcm'] ===
    'https://rcm-industries-inc.github.io/rayfin-ui/r/{name}.json',
  'components.json must configure the canonical @rcm registry URL.'
);

const items = registry.items ?? [];
const names = items.map((item) => item.name);
assert(
  new Set(names).size === names.length,
  'registry.json contains duplicate item names.'
);

const requiredItems = [
  'app-foundation',
  'rcm-theme',
  'theme-provider',
  'theme-toggle',
  'app-shell',
  'auth-page',
  'utils',
  'button',
  'card',
  'field',
  'modal',
  'data-table',
];
for (const name of requiredItems) {
  assert(names.includes(name), `Missing required registry item: ${name}.`);
}

for (const item of items) {
  for (const file of item.files ?? []) {
    assert(
      existsSync(resolve(root, file.path)),
      `${item.name} declares missing file ${file.path}.`
    );
  }

  for (const dependency of item.registryDependencies ?? []) {
    assert(
      dependency.startsWith('@rcm/'),
      `${item.name} must use an explicit @rcm dependency: ${dependency}.`
    );
    const dependencyName = dependency.replace(/^@rcm\//, '');
    assert(
      names.includes(dependencyName),
      `${item.name} references unknown registry item ${dependency}.`
    );
  }
}

const appFoundation = items.find((item) => item.name === 'app-foundation');
for (const dependency of [
  '@rcm/utils',
  '@rcm/rcm-theme',
  '@rcm/theme-provider',
  '@rcm/app-shell',
  '@rcm/auth-page',
]) {
  assert(
    appFoundation?.registryDependencies?.includes(dependency),
    `app-foundation must include ${dependency}.`
  );
}

const universalColors = {
  'rcm-teal': '#15a0a6',
  'rcm-deep-teal': '#0e6e72',
  'rcm-div-afp': '#15a0a6',
  'rcm-div-anc': '#0e6e72',
  'rcm-div-imp': '#2e5e8c',
  'rcm-div-inl': '#e0a458',
};
const theme = items.find((item) => item.name === 'rcm-theme');
for (const [token, value] of Object.entries(universalColors)) {
  assert(
    theme?.cssVars?.light?.[token]?.toLowerCase() === value,
    `rcm-theme ${token} must match the universal brand value ${value}.`
  );
}

for (const path of [
  'src/components/rcm/app-shell.tsx',
  'src/components/rcm/auth-page.tsx',
]) {
  const source = readText(path);
  assert(
    !source.includes('AuthContext') && !source.includes('@/services/'),
    `${path} must receive application state through props.`
  );
}

const forbiddenPackages = [
  '@microsoft/rayfin-client',
  '@microsoft/rayfin-core',
  '@microsoft/rayfin-data',
  '@microsoft/rayfin-auth-provider-fabric',
  'react-router-dom',
];
for (const dependency of forbiddenPackages) {
  assert(
    !packageJson.dependencies?.[dependency] &&
      !packageJson.devDependencies?.[dependency],
    `rayfin-ui must not carry application dependency ${dependency}.`
  );
}
assert(
  !packageJson.template,
  'rayfin-ui must not advertise itself as an application template.'
);

if (errors.length) {
  console.error('RCM web foundation validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `RCM web foundation is valid (${items.length} registry items, ${requiredItems.length} required checks).`
);
