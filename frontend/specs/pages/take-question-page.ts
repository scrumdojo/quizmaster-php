import type { Page } from '@playwright/test'

export class TakeQuestionPage {
    constructor(private page: Page) {}

    questionLocator = () => this.page.locator('h1')

    answersLocator = () => this.page.locator('li')

    answerLocator = (answer: string) =>
        this.page.locator(`input[type="checkbox"][value="${answer}"],input[type="radio"][value="${answer}"]`)

    answerExplanationLocatorForAnswer = (answer: string) =>
        this.answerLocator(answer)
            .locator('..')
            .locator('..')
            .locator('span.explanation')
            .locator('..')
            .locator('span.explanationText')

    emptyAnswerExplanationLocatorForAnswer = (answer: string) =>
        this.answerLocator(answer).locator('..').locator('span.explanation')

    selectAnswer = (answer: string) => this.answerLocator(answer).check()
    unselectAnswer = (answer: string) => this.answerLocator(answer).uncheck()

    submit = () => this.page.locator('[type="submit"]').click()

    submitButton = () => this.page.locator('#submit-button')

    feedbackLocator = () => this.page.locator('p.question-correctness')

    answerExplanationLocator = () => this.page.locator('span.explanationText')

    questionExplanationLocator = () => this.page.locator('p.question-explanation')

    selectedAnswersLocator = () => this.page.locator('input:checked')

    answerInputsLocator = () => this.page.locator('input[type="checkbox"],input[type="radio"]')

    submitLocator = () => this.page.locator('input[type="submit"]')
}
