import type { Page, TestInfo } from '@playwright/test'

import { CreateQuestionPage, QuizPage, CreateQuizPage, TakeQuestionPage, QuizScorePage } from '../../pages'
import type { Question } from './question'
import type { QuizCreateResponse } from '../../../src/model/quiz-create-response'

export class QuizmasterWorld {
    constructor(
        public page: Page,
        public testInfo: TestInfo,
    ) {
        this.createQuestionPage = new CreateQuestionPage(this.page)
        this.takeQuestionPage = new TakeQuestionPage(this.page)
        this.quizPage = new QuizPage(this.page)
        this.createQuizPage = new CreateQuizPage(this.page)
        this.quizScorePage = new QuizScorePage(this.page)
    }

    readonly createQuestionPage: CreateQuestionPage
    readonly takeQuestionPage: TakeQuestionPage
    readonly quizPage: QuizPage
    readonly createQuizPage: CreateQuizPage
    readonly quizScorePage: QuizScorePage

    questionWip: Question = { url: '', editUrl: '', question: '', answers: [], explanation: '' }
    nextAnswerIdx = 0
    bookmarks: Record<string, Question> = {}
    quizBookmarks: Record<string, QuizCreateResponse> = {}
    activeBookmark = ''
    get activeQuestion() {
        return this.bookmarks[this.activeBookmark]
    }

    parseAnswers(answersString: string) {
        return answersString.split(',').map(answer => answer.trim())
    }
}
