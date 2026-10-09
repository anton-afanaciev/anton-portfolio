import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({ base: '/anton-portfolio/', plugins: [react()], test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', include: ['src/**/*.test.tsx', 'src/**/*.test.ts'] } })

