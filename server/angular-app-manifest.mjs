
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/llesdental/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "src/app/formulario-reserva/formulario-reserva.component.ts": [
    {
      "path": "chunk-LHLPPLNW.js",
      "dynamicImport": false
    }
  ],
  "src/app/dashboard/dashboard-cliente/menor-form/menor-form.component.ts": [
    {
      "path": "chunk-Y4HSUBSZ.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 23640, hash: '30c0913aefc4aa8326e6403e5ed442d8e4a50516c907103339bbd76adbf1c759', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17214, hash: '3574c3c957ce65c8f3667ddb3808dd60cb1b977a0fa7ea6d607374c064d37f3f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'main-37VCW3R3.css': {size: 21119, hash: '4KuAYuPHex4', text: () => import('./assets-chunks/main-37VCW3R3_css.mjs').then(m => m.default)},
    'main.server.css': {size: 21119, hash: '4KuAYuPHex4', text: () => import('./assets-chunks/main_server_css.mjs').then(m => m.default)},
    'styles-FWS3WWRW.css': {size: 7475, hash: '+L0c9yAGLEk', text: () => import('./assets-chunks/styles-FWS3WWRW_css.mjs').then(m => m.default)}
  },
};
