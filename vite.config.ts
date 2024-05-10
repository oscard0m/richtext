/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { lightGreen } from 'kolorist'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

// eslint-disable-next-line no-console
console.log(`${lightGreen('Storyblok Richtext')} v${pkg.version}`)

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${
        pkg.version
      }\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'StoryblokRichtext',
      fileName: format => `storyblok-richtext.${format}.js`,
    },
  },
  test: {
    coverage: {
      exclude: ['playground/**', 'packages/**', 'src/index.ts']
    }
  }
})
