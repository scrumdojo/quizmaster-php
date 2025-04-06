# Chapter 4: Page Object Implementation

This chapter explores how page objects are implemented in the QuizMaster project, focusing on our specific patterns for element location and interaction.

## Basic Page Object Structure

Our page objects follow a consistent pattern:

```typescript
import type { Page } from '@playwright/test'

export class TakeQuestionPage {
    constructor(private page: Page) {}

    // Locators
    questionLocator = () => this.page.locator('h1')
    answersLocator = () => this.page.locator('li')

    // Actions
    selectAnswer = (answer: string) =>
        this.answerLocator(answer).check()

    submit = () =>
        this.page.locator('input[type="submit"]').click()
}
```

Key aspects:
- Constructor injection of Playwright Page
- Locators as arrow functions for lazy evaluation
- Clear separation between locators and actions
- Method names reflect business domain

## Locator Strategies

We use several strategies for locating elements:

1. **Semantic HTML Elements**:
```typescript
questionLocator = () => this.page.locator('h1')
answersLocator = () => this.page.locator('li')
```

2. **Form Elements with Values**:
```typescript
answerLocator = (answer: string) =>
    this.page.locator(
        `input[type="checkbox"][value="${answer}"],` +
        `input[type="radio"][value="${answer}"]`
    )
```

3. **CSS Classes for State/Type**:
```typescript
feedbackLocator = () =>
    this.page.locator('p.question-correctness')

questionExplanationLocator = () =>
    this.page.locator('p.question-explanation')
```

4. **Element Relationships**:
```typescript
answerExplanationLocatorForAnswer = (answer: string) =>
    this.page
        .locator(`input[value="${answer}"]`)
        .locator('..')
        .locator('span.explanation')
```

## Element Relationship Handling

We handle complex element relationships carefully:

```typescript
// Parent-child relationships
answerExplanationLocatorForAnswer = (answer: string) =>
    this.page
        .locator(`input[value="${answer}"]`) // Find input
        .locator('..') // Go to parent
        .locator('span.explanation') // Find child

// Multiple elements
answersLocator = () => this.page.locator('li')
// Usage in steps:
// expect(await answerLocators.count()).toBe(answers.length)
// const answerLocator = answerLocators.nth(index)
```

Key patterns:
- Navigate DOM relationships clearly
- Handle lists of elements
- Use chaining for complex selectors
- Maintain readability

## Action Encapsulation

Actions are encapsulated in meaningful methods:

```typescript
export class CreateQuestionPage {
    // Simple actions
    enterQuestion = (question: string) =>
        this.questionInput().fill(question)

    // Complex actions
    addAnswer = async (
        answer: string,
        correct: boolean,
        explanation?: string
    ) => {
        await this.answerInput().fill(answer)
        if (correct) {
            await this.correctnessCheckbox().check()
        }
        if (explanation) {
            await this.explanationInput().fill(explanation)
        }
    }

    // Form submission
    save = () => this.submitButton().click()
}
```

Benefits:
- Business-level methods
- Handles complex interactions
- Manages optional parameters
- Maintains single responsibility

## State Management

We handle different types of UI state:

1. **Form State**:
```typescript
export class CreateQuestionPage {
    hasError = () =>
        this.errorMessage().isVisible()

    getErrorMessage = () =>
        this.errorMessage().textContent()
}
```

2. **Dynamic Content**:
```typescript
export class TakeQuestionPage {
    getFeedback = () =>
        this.feedbackLocator().textContent()

    isExplanationVisible = () =>
        this.explanationLocator().isVisible()
}
```

3. **Element States**:
```typescript
export class TakeQuestionPage {
    isAnswerSelected = (answer: string) =>
        this.answerLocator(answer).isChecked()

    isSubmitEnabled = () =>
        this.submitButton().isEnabled()
}
```

## Common Patterns in Our Page Objects

1. **Reusable Locators**:
```typescript
private answerInput = () =>
    this.page.locator('input[name="answer"]')

private correctnessCheckbox = () =>
    this.page.locator('input[name="correct"]')
```

2. **Composite Actions**:
```typescript
addAnswerWithExplanation = async (
    answer: string,
    correct: boolean,
    explanation: string
) => {
    await this.addAnswer(answer, correct)
    await this.addExplanation(explanation)
}
```

3. **State Verification**:
```typescript
assertQuestionDisplayed = async (question: string) => {
    await expect(this.questionLocator())
        .toHaveText(question)
}
```

## Best Practices from Our Implementation

1. **Locator Principles**:
   - Use semantic HTML when possible
   - Prefer stable attributes (name, role) over classes
   - Keep selectors simple and maintainable
   - Document complex selectors

2. **Method Organization**:
   - Group related methods together
   - Separate locators from actions
   - Use clear, descriptive names
   - Keep methods focused

3. **State Management**:
   - Handle loading states
   - Verify element states before actions
   - Provide meaningful feedback
   - Handle errors gracefully

4. **Code Maintainability**:
   - Keep page objects focused
   - Share common patterns
   - Use TypeScript for type safety
   - Document complex interactions

In the next chapter, we'll look at overall best practices and common patterns used throughout the project.
