# Chapter 2: Step Implementation Basics

This chapter explains how Gherkin steps map to JavaScript/TypeScript code in our project. We'll start with simple examples and build up to more complex patterns.

## Basic Step Implementation

Every step in a Gherkin scenario maps to a function in our step definition files. Here's a simple example:

```gherkin
Given I start creating a question
When I enter question "What is 2 + 2?"
Then I see a link to take the question
```

These steps are implemented as functions:

```typescript
Given('I start creating a question', async () => {
    await world.page.goto('http://localhost:3000/create')
})

When('I enter question {string}', async (question: string) => {
    await world.createQuestionPage.enterQuestion(question)
})

Then('I see a link to take the question', async () => {
    await expect(world.page.locator('a')).toBeVisible()
})
```

Key points:
- Each step maps to an async function
- Parameters in steps become function parameters
- Functions use the shared [`world` object](#understanding-world-object)

## Parameter Patterns

Steps can capture parameters in different ways:

1. **String Parameters**:
```gherkin
When I enter question "What is 2 + 2?"
```
```typescript
When('I enter question {string}', async (question: string) => {
    await world.createQuestionPage.enterQuestion(question)
})
```

2. **Word Parameters**:
```gherkin
When I add the answer "4" marked as correct
```
```typescript
When('I add the answer {string} marked as {word}',
    async (answer: string, correctness: string) => {
        const isCorrect = correctness === 'correct'
        await world.createQuestionPage.addAnswer(answer, isCorrect)
    }
)
```

3. **Regular Expressions**:
```gherkin
Then the answer "4" should be marked correct
```
```typescript
Then(/^the answer "(.*)" should be marked (correct|incorrect)$/,
    async (answer: string, correctness: string) => {
        const expected = correctness === 'correct'
        const actual = await world.createQuestionPage
            .isAnswerMarkedCorrect(answer)
        expect(actual).toBe(expected)
    }
)
```

## Before and After Hooks

Cucumber provides hooks for setup and teardown:

```typescript
import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber'

// Runs once before all tests
BeforeAll(async () => {
    // Global setup like starting servers
})

// Runs before each scenario
Before(async () => {
    // Reset world state
    world.createQuestionPage = new CreateQuestionPage(world.page)
    world.bookmarks = {}
})

// Runs after each scenario
After(async () => {
    // Cleanup after scenario
    await world.page.evaluate(() => localStorage.clear())
})

// Runs once after all tests
AfterAll(async () => {
    // Global cleanup
})
```

## Understanding World Object

The World object is Cucumber's way of sharing state between steps:

1. **Basic Untyped World**:
```typescript
// Global world variable accessible for all steps definitions
import { world } from '@cucumber/cucumber'

Given('I start creating a question', async function() {
    world.page = await browser.newPage()
    await world.page.goto('/create')
})
```

2. **Adding Type Safety**:
```typescript
import { worldAs } from './common.ts'

// Define the shape of our World
interface CustomWorld {
    page: Page
    createQuestionPage: CreateQuestionPage
    takeQuestionPage: TakeQuestionPage
    bookmarks: Record<string, Question>
}

// Helper to access World with type safety
const world = worldAs<CustomWorld>()

Given('I start creating a question', async () => {
    // Now we get type checking and autocompletion
    world.createQuestionPage = new CreateQuestionPage(world.page)
    await world.createQuestionPage.navigate()
})
```

## Type Safety in Step Definitions

We use TypeScript to ensure type safety throughout our step definitions:

```typescript
// Define types for our domain
interface Question {
    question: string
    answers: Answer[]
    explanation?: string
}

interface Answer {
    text: string
    correct: boolean
    explanation?: string
}

// Use types in step definitions
Given('with answers:', async (dataTable: DataTable) => {
    const answers: Answer[] = dataTable.raw().map(
        ([text, correct, explanation]) => ({
            text,
            correct: correct === '*',
            explanation
        })
    )

    for (const answer of answers) {
        await world.createQuestionPage.addAnswer(
            answer.text,
            answer.correct,
            answer.explanation
        )
    }
})
```

## Best Practices for Step Implementation

1. **Keep Steps Focused**:
```typescript
// Good: Single responsibility
When('I add the answer {string}', async (answer: string) => {
    await world.createQuestionPage.addAnswer(answer)
})

// Bad: Too many responsibilities
When('I add the answer {string} and save', async (answer: string) => {
    await world.createQuestionPage.addAnswer(answer)
    await world.createQuestionPage.save()
    await expect(page).toHaveURL('/take')
})
```

2. **Use Clear Parameter Names**:
```typescript
// Good: Clear parameter names
When('I answer {string}', async (selectedAnswer: string) => {
    await world.takeQuestionPage.selectAnswer(selectedAnswer)
})

// Bad: Unclear parameter names
When('I answer {string}', async (x: string) => {
    await world.takeQuestionPage.selectAnswer(x)
})
```

3. **Handle Async Properly**:
```typescript
// Good: Proper async/await usage
Then('I see feedback {string}', async (feedback: string) => {
    await expect(
        world.takeQuestionPage.feedbackLocator()
    ).toHaveText(feedback)
})

// Bad: Missing await
Then('I see feedback {string}', async (feedback: string) => {
    expect(
        world.takeQuestionPage.feedbackLocator()
    ).toHaveText(feedback) // Missing await!
})
```

In the next chapter, we'll explore how we manage test data using the World object and TypeScript interfaces in more detail.
