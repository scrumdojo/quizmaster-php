import type { Page } from '@playwright/test'

export class CreateQuizPage {
    constructor(private page: Page) {}

    saveButtonLocator = () => this.page.locator('button#save')
    questionsLocator = () => this.page.locator('textarea#questions')

    confirmationMessage = () => this.page.textContent('div#confirmationMessage')

    save = () => this.saveButtonLocator().click()
    addQuestion = (questionBookmark: string) => this.questionsLocator().fill(questionBookmark)
}
