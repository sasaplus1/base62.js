module.exports = {
  '*.(js|ts)': 'npx eslint --cache',
  '*.yml': [
    'npx prettier --parser yaml --write',
    'git diff --exit-code --quiet'
  ],
  'package.json': [
    'npx fixpack',
    'npx prettier --parser json-stringify --write',
    'git diff --exit-code --quiet'
  ],
  'package-lock.json': 'node -e "process.exit(1);"'
};
