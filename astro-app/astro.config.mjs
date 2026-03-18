import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMkdocsAttr from './src/plugins/remark-mkdocs-attr.js';
// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkMkdocsAttr]
  },
  base: '/sde-skills/demo',
});