import type { DataTable } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

import type { TableOf } from './common.ts'
import { Given, Then, When } from './fixture.ts'
import type { QuizmasterWorld } from './world/world.ts'

type AnswerRaw = [string, '*' | '', string]

// if change this value, also change in frontend/src/pages/create-question/create-question.tsx
const NUM_ANSWERS = 2

const openCreatePage = async (world: QuizmasterWorld) => {
    world.createQuestionPage.gotoNew()
    world.questionWip = { url: '', editUrl: '', question: '', answers: [], explanation: '' }
}

const enterQuestion = async (world: QuizmasterWorld, question: string) => {
    await world.createQuestionPage.enterQuestion(question)
    world.questionWip.question = question
}

const enterAnswer = async (
    world: QuizmasterWorld,
    index: number,
    answer: string,
    isCorrect: boolean,
    explanation: string,
) => {
    await world.createQuestionPage.enterAnswer(index, answer, isCorrect, explanation)
    world.questionWip.answers[index] = { answer, isCorrect, explanation }
}

const saveQuestion = async (world: QuizmasterWorld, bookmark: string) => {
    await world.createQuestionPage.submit()
    world.questionWip.url = (await world.createQuestionPage.questionUrl()) || ''
    world.questionWip.editUrl = (await world.createQuestionPage.questionEditUrl()) || ''
    world.bookmarks[bookmark] = world.questionWip
}

const addAnswer = async (world: QuizmasterWorld, i: number) => {
    await world.createQuestionPage.addAnswer(i)
}

Given('a question {string}', async function (question: string) {
    await openCreatePage(this)
    await enterQuestion(this, question)
})

Given('with multi-choice selected', async function () {
    await this.createQuestionPage.setMultipleChoice()
})

Given('with answers:', async function (answerRawTable: TableOf<AnswerRaw>) {
    const raw = answerRawTable.raw()

    const isMultipleChoice = raw.filter(([_, correct]) => correct === '*').length > 1
    if (isMultipleChoice) await this.createQuestionPage.setMultipleChoice()

    for (let i = 0; i < raw.length; i++) {
        if (i >= NUM_ANSWERS) await addAnswer(this, i)
        const [answer, correct, explanation] = raw[i]
        const isCorrect = correct === '*'
        await enterAnswer(this, i, answer, isCorrect, explanation || '')
    }
})

Given('with explanation {string}', async function (explanation: string) {
    await this.createQuestionPage.enterQuestionExplanation(explanation)
    this.questionWip.explanation = explanation
})

Given('saved and bookmarked as {string}', async function (bookmark) {
    await saveQuestion(this, bookmark)
})

Given('I start creating a question', async function () {
    await openCreatePage(this)
})

When('I enter question {string}', async function (question: string) {
    await enterQuestion(this, question)
})

When(/^I add the answer "(.*)" marked as (correct|incorrect)$/, async function (answer: string, correct: string) {
    await enterAnswer(this, this.nextAnswerIdx++, answer, correct === 'correct', '')
})

When(
    /^I add the answer "(.*)" marked as (correct|incorrect) with an explanantion "(.*)"$/,
    async function (answer: string, correct: string, explanation: string) {
        await enterAnswer(this, this.nextAnswerIdx++, answer, correct === 'correct', explanation)
    },
)

When('I add an additional answer field', async function () {
    await addAnswer(this, this.nextAnswerIdx)
})

When('I save the question', async function () {
    await saveQuestion(this, 'manual')
})

When('I take the question', async function () {
    await this.createQuestionPage.followQuestionUrl()
    this.activeBookmark = 'manual'
})

When('I edit the question', async function () {
    await this.page.goto(this.questionWip.editUrl)
    // this.activeBookmark = 'manual'
})

When('I try saving the question', async function () {
    await this.createQuestionPage.submit()
})

Then('I see a link to take the question', async function () {
    const url = await this.createQuestionPage.questionUrl()
    expect(url).not.toBe('')
})

Then('I see a link to edit the question', async function () {
    const url = await this.createQuestionPage.questionEditUrl()
    expect(url).not.toBe('')
})

Then('I see an error message', async function () {
    const errorMessage = await this.createQuestionPage.errorMessage()
    expect(errorMessage).not.toBe('')
})

Then('I see 2 answers', async function () {
    await expect(this.createQuestionPage.answerTextLocator(0)).toBeVisible()
    await expect(this.createQuestionPage.answerTextLocator(1)).toBeVisible()
})

Then(/^Multiple choice is (checked|unchecked)$/, async function (state: string) {
    const expected = state === 'checked'
    const isChecked = await this.createQuestionPage.isMultipleChoice()
    expect(isChecked).toBe(expected)
})

Then('I see empty question', async function () {
    expect(await this.createQuestionPage.questionValue()).toBe('')
})

When('I click is-correct checkbox for {string}', async function (answer: string) {
    await this.createQuestionPage.isCorrectCheckboxLocator(answer).click()
})

Then(/^I see the answers$/, async function (data: DataTable) {
    for (const row of data.rows()) {
        const answer = row[0]
        const shouldBeChecked = row[1] === '*'

        const checkbox = this.createQuestionPage.isCorrectCheckboxLocator(answer)
        const isChecked = await checkbox.isChecked()

        expect(isChecked, `Answer: ${answer} should be ${shouldBeChecked}`).toBe(shouldBeChecked)
    }
})

When(/^I make the question (single|multi)-choice$/, async function (type: string) {
    if (type === 'single') {
        await this.createQuestionPage.setSingleChoice()
    } else {
        await this.createQuestionPage.setMultipleChoice()
    }
})
