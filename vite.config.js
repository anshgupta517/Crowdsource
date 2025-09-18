import { defineConfig } from 'vite'
import { qrcode } from 'vite-plugin-qrcode'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), qrcode({size: 180})],
  optimizeDeps: {
    include: [
      'ol/Map',
      'ol/View',
      'ol/layer/Tile',
      'ol/source/OSM',
      'ol/proj',
      'ol/Feature',
      'ol/geom/Point',
      'ol/layer/Vector',
      'ol/source/Vector',
      'ol/Overlay',
      'ol/style/Style',
      'ol/style/Circle',
      'ol/style/Fill',
    ],
  },
  server: {
    port: 3000,
    host:true,
  },
})
