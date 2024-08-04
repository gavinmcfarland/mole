import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js', // Entry point of your library
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'index.js', // Output file name
    library: {
      type: 'module' // Output as ESModule
    }
  },
  experiments: {
    outputModule: true // Enable outputting in module format
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel transpilation to .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // Use @babel/preset-env for Babel transpilation
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'], // Resolve .js files
  },
  mode: 'production' // Set the mode to 'production' for optimization
};
