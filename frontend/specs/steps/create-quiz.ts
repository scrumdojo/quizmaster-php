import { expect } from '@playwright/test'
import { Given, When, Then } from './fixture.ts'
import type { QuizmasterWorld } from './world/world.ts'
import type { TableOf } from './common.ts'

type QuestionRaw = [string]

const saveQuiz = async (world: QuizmasterWorld, bookmark: string, quiz: { id: string }) => {
    world.quizBookmarks[bookmark] = quiz
}

const addQuestion = async (world: QuizmasterWorld, questionBookmark: string) => {
    await world.createQuizPage.addQuestion(questionBookmark)
}

const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> =>
    fetch(url, init)
        .then(response => response.json())
        .then(data => data as T)

Given('a quiz {string} containing questions', async function (quiz: string, questions: TableOf<QuestionRaw>) {
    const quizResponse: { id: string } = await fetchJson(`http://localhost:8080/api/quiz?id=${quiz}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questions.raw()),
    })
    await saveQuiz(this, quiz, quizResponse)
})

Given('I start creating a quiz', async function () {
    await this.page.goto('/quiz')
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
