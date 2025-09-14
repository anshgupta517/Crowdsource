import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
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
})
