// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'; // אם אתה משתמש ב-React

export default defineConfig({
  plugins: [react()], // כלול את התוספים שאתה צריך לבדיקות
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // וודא שהנתיב נכון
    // ניתן להוסיף כאן גם:
    // css: false,
    // coverage: {
    //   provider: 'v8',
    //   reporter: ['text', 'json', 'html'],
    // },
  },
});