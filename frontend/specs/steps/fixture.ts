import { test as base, createBdd } from 'playwright-bdd'
import { QuizmasterWorld } from './world/world.ts'

export const test = base.extend<{ world: QuizmasterWorld }>({
    world: async ({ page }, use, testInfo) => {
        const world = new QuizmasterWorld(page, testInfo)
        await use(world)
    },
})

export const { Given, When, Then } = createBdd(test, { worldFixture: 'world' })
