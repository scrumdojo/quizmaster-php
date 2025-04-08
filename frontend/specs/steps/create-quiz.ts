import { expect } from '@playwright/test'
import { Given, When, Then } from './fixture.ts'
import type { QuizmasterWorld } from './world/world.ts'

const addQuestion = async (world: QuizmasterWorld, questionBookmark: string) => {
    await world.createQuizPage.addQuestion(questionBookmark)
}

Given('I start creating a quiz', async function () {
    await this.page.goto('/quiz/new')
})

When('I add the question {string} to the quiz', async function (questionBookmark: string) {
    await addQuestion(this, questionBookmark)
})

When('I save the quiz', async function () {
    await this.createQuizPage.save()
})

Then('I see a confirmation message {string}', async function () {
    const confirmationMessage = await this.createQuizPage.confirmationMessage()
    expect(confirmationMessage).toBe('Quiz created')
})
