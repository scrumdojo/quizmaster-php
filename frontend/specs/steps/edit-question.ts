import { expect } from '@playwright/test'
import { Then, When } from './fixture.ts'

When('I start editing question {string}', async function (bookmark: string) {
    await this.createQuestionPage.gotoEdit(this.bookmarks[bookmark].editUrl)
    this.activeBookmark = bookmark
})

Then('I see the question, answers and explanations', async function () {
    await this.createQuestionPage.waitForLoaded()

    const question = await this.createQuestionPage.questionValue()
    expect(question).toBe(this.activeQuestion.question)
})

When('I change question to {string}', async function (newQuestion: string) {
    await this.createQuestionPage.enterQuestion(newQuestion)
})

When('I save it', async function () {
    await this.createQuestionPage.submit()
})

Then('I see unchanged url', async function () {
    const link = await this.createQuestionPage.questionUrl()
    expect(link).toBe(this.activeQuestion.url)
})

When('I reload the page', async function () {
    await this.createQuestionPage.reloadPage()
})

When('I change the correct answer to {int}', async function (value: number) {
    this.createQuestionPage.markButton(value).check()
})

Then('I see the correct answer is {int}', async function (value: number) {
    const markCircle = this.createQuestionPage.markButton(value)
    await expect(markCircle).toBeChecked()
})

When('I delete all explanations and delete general explanation', async function () {
    await this.createQuestionPage.clearExplanation()
})

When('I change a general explanation to {string}', async function (explanationLabel: string) {
    await this.createQuestionPage.enterQuestionExplanation(explanationLabel)
})

Then('I see a general explanation the same as {string}', async function (explanationLabel: string) {
    const resultText = await this.createQuestionPage.questionExplanationLocator().textContent()
    expect(resultText).toBe(explanationLabel)
})

When(
    'I change a single answer explanation {int} to {string}',
    async function (answerIndex: number, answerLabel: string) {
        const answer = await this.createQuestionPage.getExplanationLocator(answerIndex)
        await answer.fill(answerLabel)
    },
)

Then('I see changed explanation {int} to {string}', async function (answerIndex: number, answerLabel: string) {
    const answer = await this.createQuestionPage.getExplanationLocator(answerIndex).inputValue()
    expect(answer).toBe(answerLabel)
})

When('I change of an answer label {int} to {string}', async function (answerIndex: number, answerLabel: string) {
    const answer = await this.createQuestionPage.answerTextLocator(answerIndex)
    await answer.fill(answerLabel)
})

Then('I see a changed label {int} to {string}', async function (answerIndex: number, answerLabel: string) {
    const answer = await this.createQuestionPage.answerTextLocator(answerIndex).inputValue()
    expect(answer).toBe(answerLabel)
})

When('I mark a multiple choice', async function () {
    await this.createQuestionPage.multipleChoiceLocator().click()
})

Then('I see checkboxes for every answer', async function () {
    const getCheckbox = await this.createQuestionPage.isCorrectCheckboxesLocator().all()
    for (const li of getCheckbox) expect(await li.getAttribute('class')).toBe('answer-isCorrect-checkbox-multi')
})

When('I mark {int} checkbox', async function (index: number) {
    await this.createQuestionPage.markButton(index).click()
})

Then('I see answer {int} with marked checkbox', async function (index: number) {
    await expect(await this.createQuestionPage.markButton(index)).toBeChecked()
})
