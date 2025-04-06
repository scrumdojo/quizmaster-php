import type { Page } from '@playwright/test'

export class QuizPage {
    constructor(private page: Page) {}

    nextButtonLocator = () => this.page.locator('button#next')
    evaluateButtonLocator = () => this.page.locator('button#evaluate')
    progressBarLocator = () => this.page.locator('#progress-bar')

    next = () => this.nextButtonLocator().click()
    evaluate = () => this.evaluateButtonLocator().click()
}
