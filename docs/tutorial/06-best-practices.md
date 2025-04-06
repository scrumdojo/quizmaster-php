# Chapter 5: Best Practices from the Project

This chapter covers the best practices and common patterns used throughout the QuizMaster project. Instead of generic testing best practices, we'll focus on specific patterns that make our tests maintainable and reliable.

## Code Organization

Our test code follows a clear organizational structure:

```
frontend/
├── tests/
│   ├── pages/          # Page Objects
│   │   ├── create-question-page.ts
│   │   ├── take-question-page.ts
│   │   └── index.ts
│   ├── steps/          # Step Definitions
│   │   ├── common.ts
│   │   ├── create-question.ts
│   │   ├── edit-question.ts
│   │   └── take-question.ts
│   └── cucumber.yaml   # Cucumber configuration
└── specs/              # Feature Files
    ├── CreateQuestionGui.feature
    ├── EditQuestionGui.feature
    ├── MultipleChoiceQuestion.feature
    └── SingleChoiceQuestion.feature
```

Key principles:
- Clear separation of concerns
- Logical grouping of related files
- Consistent file naming
- Central configuration

## Reusable Utilities

Common utilities are shared across the test suite:

```typescript
// common.ts
export const worldAs = <T>() => world as unknown as T

export const expectTextToBe = async (
    locator: Locator,
    text: string
) => {
    await expect(locator).toHaveText(text)
}

export const expectTextToContain = async (
    locator: Locator,
    text: string
) => {
    await expect(locator).toContainText(text)
}

export const expectThatIsNotVisible = async (
    locator: Locator
) => {
    await expect(locator).not.toBeVisible()
}
```

Benefits:
- Consistent assertions
- DRY principle
- Shared timeout handling
- Common error messages

## TypeScript Integration

We leverage TypeScript throughout the project:

1. **Type Definitions**:
```typescript
interface Question {
    question: string
    answers: Answer[]
    explanation?: string
}

interface Answer {
    answer: string
    correct: boolean
    explanation?: string
}
```

2. **World Type Safety**:
```typescript
interface CustomWorld {
    page: Page
    createQuestionPage: CreateQuestionPage
    takeQuestionPage: TakeQuestionPage
    bookmarks: Record<string, Question>
}

const world = worldAs<CustomWorld>()
```

3. **Page Object Methods**:
```typescript
export class CreateQuestionPage {
    constructor(private page: Page) {}

    addAnswer(answer: string, correct: boolean): Promise<void>
    getErrorMessage(): Promise<string | null>
    isSubmitEnabled(): Promise<boolean>
}
```

## Common Patterns

1. **Waiting Strategies**:
```typescript
// Explicit waits with meaningful timeouts
await expect(locator).toBeVisible({
    timeout: 5000
})

// State checking before actions
async submitAnswer() {
    await expect(
        this.submitButton()
    ).toBeEnabled()
    await this.submitButton().click()
}
```

2. **Data Management**:
```typescript
// Using bookmarks for test data
Given('saved and bookmarked as {string}', async (bookmark: string) => {
    world.bookmarks[bookmark] = {
        question: world.currentQuestion,
        answers: world.currentAnswers,
        url: await world.page.url()
    }
})
```

3. **Page Object Interactions**:
```typescript
// Chainable actions
async addQuestionWithAnswers(
    question: string,
    answers: Answer[]
) {
    await this.enterQuestion(question)
    for (const answer of answers) {
        await this.addAnswer(
            answer.text,
            answer.correct,
            answer.explanation
        )
    }
    await this.save()
}
```

## Project-Specific Guidelines

1. **Feature File Guidelines**:
   - One feature per file
   - Clear scenario names
   - Reuse steps when possible
   - Use Background for common setup

2. **Step Definition Guidelines**:
   - Keep steps focused
   - Use clear parameter names
   - Handle async operations properly
   - Share common step logic

3. **Page Object Guidelines**:
   - Semantic locators
   - Business-level methods
   - Handle state properly
   - Document complex interactions

4. **Testing Guidelines**:
   - Independent scenarios
   - Clear test data
   - Proper error handling
   - Meaningful assertions

## Debugging Tips

1. **Visual Debugging**:
```typescript
// Add pause for debugging
await page.pause()

// Take screenshots
await page.screenshot({
    path: 'debug.png'
})
```

2. **Logging**:
```typescript
// Add debug logs
console.log('Current state:', await getState())

// Log element state
console.log(
    'Element visible:',
    await locator.isVisible()
)
```

3. **Error Investigation**:
```typescript
try {
    await action()
} catch (error) {
    console.log('Page URL:', await page.url())
    console.log('Error:', error)
    throw error
}
```

These practices have evolved through actual project usage and help maintain a reliable, maintainable test suite. Remember to follow these patterns when adding new tests or modifying existing ones.
