import { expect } from '@playwright/test'
import { expectTextToBe } from './common.ts'
import { Given, When, Then } from './fixture.ts'

Given('I visit the quiz {string} page', async function (quiz: string) {
    await this.page.goto(`/quiz/${quiz}`)
})

Given('quiz is created as EndFeedBackQuiz', async () => {
    // TODO Check EndFeedback Quiz checkbox
    await Promise<null>
})

Given('I visit the quiz page', async function () {
    await this.page.goto('/quiz')
})

Given('I visit the end feedback quiz page', async function () {
    await this.page.goto('/quiz/X?endfeedback=1')
})

Then('I should see heading "Quiz"', async function () {
    await expectTextToBe(this.page.locator('h2'), 'Quiz')
})

Then('I see the question {string}', async function (question: string) {
    const questionBookmark = this.bookmarks[question]
    await expectTextToBe(this.takeQuestionPage.questionLocator(), questionBookmark.question)
})

Then('I should see the next button', async function () {
    await expect(this.quizPage.nextButtonLocator()).toBeVisible()
})

Then('I should not see the submit button', async function () {
    await expect(this.takeQuestionPage.submitButton()).not.toBeVisible()
})

Then('I should not see the next button', async function () {
    await expect(this.quizPage.nextButtonLocator()).not.toBeVisible()
})

When('I click the next button', async function () {
    await this.quizPage.next()
})

When('I click the next question', async function () {
    await this.quizPage.next()
})

Then('I should see the next question', async function () {
    const secondQuestion = this.bookmarks.France
    await expectTextToBe(this.takeQuestionPage.questionLocator(), secondQuestion.question)
})

Then('I should see the evaluate button', async function () {
    await expect(this.quizPage.evaluateButtonLocator()).toBeVisible()
})

Then('I should not see the evaluate button', async function () {
    await expect(this.quizPage.evaluateButtonLocator()).not.toBeVisible()
})

Then('I click the evaluate button', async function () {
    await this.quizPage.evaluate()
})

Given('I refresh page', async function () {
    await this.page.reload()
})

Then('I should see answer {string} is checked', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const element of answers) {
        await expect(this.takeQuestionPage.answerLocator(element)).toBeChecked()
    }
})

Then('I should see answer {string} is unchecked', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const element of answers) {
        await expect(this.takeQuestionPage.answerLocator(element)).not.toBeChecked()
    }
})

Then(
    'I should see the progress bar showing page {int} of {int}',
    async function (expectedValue: number, maxValue: number) {
        const progressBarValue = await this.quizPage.progressBarLocator().getAttribute('value')
        expect(progressBarValue).toBe(expectedValue.toString())
        const progressBarMaxValue = await this.quizPage.progressBarLocator().getAttribute('max')
        expect(progressBarMaxValue).toBe(maxValue.toString())
    },
)

Then('I should not see the back button', async function () {
    await expect(this.quizPage.backButtonLocator()).not.toBeVisible()
})

Then('I should see the back button', async function () {
    await expect(this.quizPage.backButtonLocator()).toBeVisible()
})

When('I click the back button', async function () {
    await this.quizPage.back()
})

Then('I should see the {string} question', async function (question: string) {
    await expectTextToBe(this.takeQuestionPage.questionLocator(), question)
})
