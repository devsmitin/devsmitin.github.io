'use strict';
importScripts('sw-toolbox.js');
toolbox.precache(['index.html', 'https://imsmit.github.io/css-core/dist/css/core.min.css']);
//toolbox.router.get('/images/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, { networkTimeoutSeconds: 5});
