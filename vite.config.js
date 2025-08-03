import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
const isGitHub = process.env.DEPLOY_TARGET === 'github';
export default defineConfig({
  server: {
    host: true
  },
  plugins: [tailwindcss(), react()],
  base: isGitHub ? '/jira/' : '/',
})
