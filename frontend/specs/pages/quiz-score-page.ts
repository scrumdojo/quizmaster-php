import type { Page } from '@playwright/test'

export class QuizScorePage {
    constructor(private page: Page) {}

    private correctAnswerLocator = () => this.page.locator('#correct-answers')
    correctAnswers = () => this.correctAnswerLocator().textContent().then(Number)

    private totalQuestionsLocator = () => this.page.locator('#total-questions')
    totalQuestions = () => this.totalQuestionsLocator().textContent().then(Number)

    private percentageResultLocator = () => this.page.locator('#percentage-result')
    percentageResult = () => this.percentageResultLocator().textContent().then(Number)

    private textResultLocator = () => this.page.locator('#text-result')
    textResult = () => this.textResultLocator().textContent()
}
