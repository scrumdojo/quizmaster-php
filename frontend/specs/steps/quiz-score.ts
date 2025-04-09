import { expect } from '@playwright/test'
import { Given, Then } from './fixture.ts'

Given('I finish the quiz', async function () {
    await this.page.goto('quiz/score')
})

Then(
    /^I see the result (\d+) correct out of (\d+), (\d.+)%, (passed|failed)/,
    async function (
        expectedCorrectAnswers: number,
        expectedTotalQuestions: number,
        expectedPercentage: number,
        expectedTextResult: string,
    ) {
        const correctAnswers = await this.quizScorePage.correctAnswers()
        expect(correctAnswers).toBe(expectedCorrectAnswers)

        const totalQuestions = await this.quizScorePage.totalQuestions()
        expect(totalQuestions).toBe(expectedTotalQuestions)

        const result = await this.quizScorePage.percentageResult()
        expect(result).toBe(expectedPercentage)

        const textResult = await this.quizScorePage.textResult()
        expect(textResult).toBe(expectedTextResult)
    },
)
Then('I see question {int} {string} {string}', async function (id: number, feedback: string, question: string) {
    const questionText = await this.quizScorePage.question(id)
    expect(questionText).toBe(question)

    const feedbackText = await this.quizScorePage.feedback(id)
    expect(feedbackText).toBe(feedback)
})
