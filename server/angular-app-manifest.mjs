
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/llesdental/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/llesdental/login",
    "route": "/llesdental"
  },
  {
    "renderMode": 2,
    "route": "/llesdental/login"
  },
  {
    "renderMode": 2,
    "route": "/llesdental/crear-admin"
  },
  {
    "renderMode": 2,
    "route": "/llesdental/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/llesdental/registro-cliente"
  },
  {
    "renderMode": 2,
    "route": "/llesdental/dashboard-cliente"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LHLPPLNW.js"
    ],
    "route": "/llesdental/dashboard-cliente/clientes"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-Y4HSUBSZ.js"
    ],
    "route": "/llesdental/dashboard-cliente/representados"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23640, hash: '30c0913aefc4aa8326e6403e5ed442d8e4a50516c907103339bbd76adbf1c759', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17214, hash: '3574c3c957ce65c8f3667ddb3808dd60cb1b977a0fa7ea6d607374c064d37f3f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 26756, hash: '169c42094bb3d96dd4fa8e38c790e6481aa6d5318b999dba08821141410a2350', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'crear-admin/index.html': {size: 25973, hash: '241c2cd15aa818f72398c8ff067905a84c8f9e7a002eed1cdfd88ec23ce516f6', text: () => import('./assets-chunks/crear-admin_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 26756, hash: '169c42094bb3d96dd4fa8e38c790e6481aa6d5318b999dba08821141410a2350', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'registro-cliente/index.html': {size: 36802, hash: 'a65353a0b2ed8ff540fceb73bbd1e540727d60b4aee64fe698a6d18d3abd9c59', text: () => import('./assets-chunks/registro-cliente_index_html.mjs').then(m => m.default)},
    'dashboard-cliente/index.html': {size: 83778, hash: '9ea174a98b51ad0689ed8d46ddc047df45d2d4d82e1848d0b6f2098d835ae7a6', text: () => import('./assets-chunks/dashboard-cliente_index_html.mjs').then(m => m.default)},
    'dashboard-cliente/clientes/index.html': {size: 88084, hash: 'f3f98bf93c92cc9f04d4f007f3bd637df57a73dda07671ba8225ec3e98084705', text: () => import('./assets-chunks/dashboard-cliente_clientes_index_html.mjs').then(m => m.default)},
    'dashboard-cliente/representados/index.html': {size: 85213, hash: '9888f763a2872cd2a5817e4ac147330b6b966511bbd9b18f33c14c86646e242c', text: () => import('./assets-chunks/dashboard-cliente_representados_index_html.mjs').then(m => m.default)},
    'main-37VCW3R3.css': {size: 21119, hash: '4KuAYuPHex4', text: () => import('./assets-chunks/main-37VCW3R3_css.mjs').then(m => m.default)},
    'main.server.css': {size: 21119, hash: '4KuAYuPHex4', text: () => import('./assets-chunks/main_server_css.mjs').then(m => m.default)},
    'styles-FWS3WWRW.css': {size: 7475, hash: '+L0c9yAGLEk', text: () => import('./assets-chunks/styles-FWS3WWRW_css.mjs').then(m => m.default)}
  },
};
