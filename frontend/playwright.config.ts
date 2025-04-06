import { defineConfig } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

const port = process.env.FE_PORT || '8080'

export default defineConfig({
    timeout: 5000,
    projects: [
        { name: 'chromium', use: { browserName: 'chromium', baseURL: `http://localhost:${port}` } },
    ],
    testDir: defineBddConfig({
        features: 'specs',
        steps: 'specs/steps/*.ts',
    })
})
