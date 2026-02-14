import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['practices/**/*.test.ts'],
    environment: 'node',
    passWithNoTests: true,
  },
})
