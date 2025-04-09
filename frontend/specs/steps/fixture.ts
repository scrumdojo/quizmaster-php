import { test as base, createBdd } from 'playwright-bdd'
import { QuizmasterWorld } from './world/world.ts'
import { emptyCoverageDir, toIstanbul, writeCoverage } from './coverage/coverage.ts'

export const test = base.extend<{ world: QuizmasterWorld }>({
    world: async ({ page }, use, testInfo) => {
        const world = new QuizmasterWorld(page, testInfo)
        await use(world)
    },
})

export const { Given, When, Then, BeforeScenario, AfterScenario, BeforeAll } = createBdd(test, {
    worldFixture: 'world',
})

const ENABLE_COVERAGE = process.env.ENABLE_COVERAGE === '1'

BeforeAll(emptyCoverageDir)

BeforeScenario(async function () {
    if (!ENABLE_COVERAGE) return

    await this.page.coverage.startJSCoverage()
})

AfterScenario(async function () {
    if (!ENABLE_COVERAGE) return

    const jsCoverage = await this.page.coverage.stopJSCoverage()
    const istanbulCoverage = await toIstanbul(jsCoverage)
    writeCoverage(istanbulCoverage, this.testInfo.title)
})
