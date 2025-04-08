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

    private questionLocator = (id: number) => this.page.locator(`#answers-${id} > .question`)
    question = (id: number) => this.questionLocator(id).textContent()

    private answerLocator = (id: number) => this.page.locator(`#answers-${id} > .answer`)
    answer = (id: number) => this.answerLocator(id).textContent()

    private feedbackLocator = (id: number) => this.page.locator(`#answers-${id} > .feedback`)
    feedback = (id: number) => this.feedbackLocator(id).textContent()
}
