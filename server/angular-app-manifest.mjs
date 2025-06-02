
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/crear-admin"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/registro-cliente"
  },
  {
    "renderMode": 2,
    "route": "/dashboard-cliente"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LHLPPLNW.js"
    ],
    "route": "/dashboard-cliente/clientes"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-Y4HSUBSZ.js"
    ],
    "route": "/dashboard-cliente/representados"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23629, hash: 'e442008a50a25e9fffadfcd89a2460a47811a2c994b74517f9a078860ffccdc4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17203, hash: 'e59c8d74fa5d269e5f3f92f24548b3e3ee436b8ce1065b591010ccd49e123b05', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 26734, hash: '05bca1e340814d4f73e3f6509e86dd717b8c1d4af8166c901fa79c6902fdcbb2', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'crear-admin/index.html': {size: 25962, hash: '0442875a98ec54f5fb1431c35a2d47a16a0a5b5e706c866a0366ac7816f5af93', text: () => import('./assets-chunks/crear-admin_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 26734, hash: '05bca1e340814d4f73e3f6509e86dd717b8c1d4af8166c901fa79c6902fdcbb2', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'registro-cliente/index.html': {size: 36774, hash: '7af5e3c5228d018e05c563ce053f2932af4e23996f3f2bff268717c489a58325', text: () => import('./assets-chunks/registro-cliente_index_html.mjs').then(m => m.default)},
    'dashboard-cliente/index.html': {size: 83756, hash: '8287ef5d0256a214d480001f7e4fce08ba6fb307cef5105864760878381f16be', text: () => import('./assets-chunks/dashboard-cliente_index_html.mjs').then(m => m.default)},
    'dashboard-cliente/clientes/index.html': {size: 88062, hash: 'f0e544cd53ad37307b1f8355774a0790387e706ab3e9af81172be35bac1c6346', text: () => import('./assets-chunks/dashboard-cliente_clientes_index_html.mjs').then(m => m.default)},
    'dashboard-cliente/representados/index.html': {size: 85191, hash: '8798c2ca597e41e740472920aa55a19215deb89f4da19ee45fa19d941a58cb0c', text: () => import('./assets-chunks/dashboard-cliente_representados_index_html.mjs').then(m => m.default)},
    'styles-B53FQZC7.css': {size: 7462, hash: 'f4zwhJCjTiQ', text: () => import('./assets-chunks/styles-B53FQZC7_css.mjs').then(m => m.default)}
  },
};
