// Custom Vite plugin to inject CSS into JS bundle
import { readFileSync } from 'fs';
import { resolve } from 'path';

export function injectCSS() {
  return {
    name: 'inject-css',
    generateBundle(options, bundle) {
      try {
        // Read CSS content directly from source
        const cssPath = resolve(process.cwd(), 'src/styles.css');
        const cssContent = readFileSync(cssPath, 'utf-8');
        
        // Remove CSS assets from bundle if they exist
        Object.keys(bundle).forEach(fileName => {
          if (fileName.endsWith('.css')) {
            delete bundle[fileName];
          }
        });
        
        // Inject CSS into JS files
        Object.entries(bundle).forEach(([fileName, asset]) => {
          if (fileName.endsWith('.js') && asset.type === 'chunk') {
            const cssInjection = `
// Auto-injected CSS for Lowcoder single-file deployment
(function() {
  if (typeof document !== 'undefined') {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ${JSON.stringify(cssContent)};
    document.head.appendChild(style);
  }
})();

`;
            asset.code = cssInjection + asset.code;
          }
        });
      } catch (error) {
        console.warn('CSS injection failed:', error.message);
      }
    }
  };
}
