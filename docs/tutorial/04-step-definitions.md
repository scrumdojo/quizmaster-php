# Chapter 3: Step Definitions Deep Dive

This chapter explores how step definitions are implemented in the QuizMaster project, focusing on our integration of Cucumber.js with Playwright and specific patterns we use.

## Cucumber.js Integration with Playwright

Our step definitions combine Cucumber.js for BDD and Playwright for browser automation:

```typescript
import { Before, type DataTable, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { TakeQuestionPage } from '../pages'

interface TakeQuestionWorld {
    quizTakingPage: TakeQuestionPage
    page: Page  // Playwright page
}

Before(() => {
    world.quizTakingPage = new TakeQuestionPage(world.page)
})
```

Key points:
- Cucumber.js provides the BDD framework
- Playwright handles browser automation
- Page objects are initialized in Before hooks
- TypeScript ensures type safety

## Parameter Extraction Patterns

We use different patterns for extracting parameters from step definitions:

1. **String Parameters**:
```typescript
When('I enter question {string}', async (question: string) => {
    await world.createQuestionPage.enterQuestion(question)
})
```

2. **Multiple Parameters**:
```typescript
When('I add the answer {string} marked as {word}', async (answer: string, correctness: string) => {
    await world.createQuestionPage.addAnswer(answer, correctness === 'correct')
})
```

3. **Data Tables**:
```typescript
Given('with answers:', async (dataTable: DataTable) => {
    for (const [answer, correct, explanation] of dataTable.raw()) {
        await world.createQuestionPage.addAnswer(
            answer,
            correct === '*',
            explanation
        )
    }
})
```

## Regular Expressions vs String Patterns

We use both regex and string patterns, each for specific purposes:

1. **String Patterns** for simple matches:
```typescript
When('I save the question', async () => {
    await world.createQuestionPage.save()
})
```

2. **Regular Expressions** for complex patterns:
```typescript
Then(/^I see the answer explanations for answers$/, async (data: DataTable) => {
    for (const row of data.rows()) {
        if (row[1]) {
            await expectTextToBe(
                world.quizTakingPage.answerExplanationLocatorForAnswer(row[0]),
                row[1]
            )
        }
    }
})
```

Choose based on:
- String patterns for exact matches
- Regex for flexible matching
- Regex when handling optional parts
- String patterns for better readability

## Async/Await Usage

Our step definitions handle asynchronous operations consistently:

```typescript
When('I take question {string}', async (bookmark: string) => {
    await world.page.goto(world.bookmarks[bookmark].url)
    world.activeBookmark = bookmark
})

Then('I see the question and the answers', async () => {
    await expectTextToBe(
        world.quizTakingPage.questionLocator(),
        activeQuestion().question
    )

    const answers = activeQuestion().answers
    const answerLocators = world.quizTakingPage.answersLocator()

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, { answer }] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
})
```

Key patterns:
- All browser interactions are async
- Proper await usage for all promises
- Sequential execution of steps
- Error handling through Playwright's retry mechanism

## Common Assertion Patterns

We use helper functions for consistent assertions:

```typescript
// Helper functions
const expectTextToBe = async (locator: Locator, text: string) => {
    await expect(locator).toHaveText(text)
}

const expectThatIsNotVisible = async (locator: Locator) => {
    await expect(locator).not.toBeVisible()
}

// Usage in steps
Then('I see feedback {string}', async feedback => {
    await expectTextToBe(
        world.quizTakingPage.feedbackLocator(),
        feedback
    )
})
```

Benefits:
- Consistent error messages
- Reusable assertion logic
- Clear intention in step definitions
- Built-in retry logic from Playwright

## Step Organization

Our steps are organized by feature area:

```
frontend/tests/steps/
├── common.ts         # Shared utilities and types
├── create-question.ts # Question creation steps
├── edit-question.ts   # Question editing steps
├── question.ts        # Common question-related steps
└── take-question.ts   # Question taking steps
```

This structure:
- Groups related steps together
- Makes steps easy to find
- Allows sharing common functionality
- Maintains separation of concerns

## Best Practices

1. **Step Reusability**:
   - Keep steps focused and single-purpose
   - Use parameters to make steps flexible
   - Share common steps across features

2. **Async Handling**:
   - Always use async/await
   - Handle promises properly
   - Use Playwright's built-in waiting mechanisms

3. **Error Handling**:
   - Use descriptive assertion messages
   - Leverage Playwright's retry mechanism
   - Provide helpful failure context

4. **Code Organization**:
   - Group related steps together
   - Share common utilities
   - Maintain consistent patterns

In the next chapter, we'll explore how page objects encapsulate the actual browser interactions.
