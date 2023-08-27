/**
 * Metro configuration for React Native
 * @see https://github.com/facebook/react-native
 * @see https://github.com/vercel/turbo/blob/main/examples/with-react-native-web/apps/native/metro.config.js
 */

const path = require('path');
// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

/**
 * Metro configuration
 * @see https://facebook.github.io/metro/docs/configuration
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

config.resolver = {};

// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

config.transformer = {
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;
