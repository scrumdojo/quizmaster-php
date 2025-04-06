# Chapter 2: Test Data Management

This chapter explores how test data is managed in the QuizMaster project, focusing on our specific patterns and implementations rather than generic testing concepts.

## The World Pattern



We use Cucumber's World pattern with TypeScript for type-safe test data management. Here's how it's implemented in our project:

```typescript
interface TakeQuestionWorld {
    quizTakingPage: TakeQuestionPage
    bookmarks: Record<string, Question>
    activeBookmark: string
}

const world = worldAs<TakeQuestionWorld>()
```

Key aspects:
- TypeScript interface defines the shape of shared test data
- `bookmarks` stores questions by name for easy reference
- `activeBookmark` tracks the current question being tested
- Page objects are stored in the world for reuse

## Bookmarking Pattern

Our unique bookmarking pattern makes test data management more maintainable:

```gherkin
Given a question "What is capital of France?"
* with answers:
  | Marseille |   |
  | Lyon      |   |
  | Paris     | * |
  | Toulouse  |   |
* saved and bookmarked as "France"
```

Implementation in step definitions:

```typescript
const activeQuestion = () => world.bookmarks[world.activeBookmark]

When('I take question {string}', async (bookmark: string) => {
    await world.page.goto(world.bookmarks[bookmark].url)
    world.activeBookmark = bookmark
})
```

Benefits:
- Questions can be referenced by name across scenarios
- Maintains test data context
- Makes scenarios more readable
- Enables data reuse without repetition

## TypeScript Interfaces for Type Safety

We use TypeScript interfaces to ensure test data consistency:

```typescript
interface Question {
    question: string
    answers: Answer[]
    explanation?: string
    url: string
}

interface Answer {
    answer: string
    correct: boolean
    explanation?: string
}
```

This provides:
- Compile-time type checking
- Auto-completion in your IDE
- Clear documentation of data structure
- Runtime type safety when combined with validation

## Handling Complex Test Data

Our project handles various types of test data:

1. **Simple Questions**:
```typescript
{
    question: "What is 2 + 2?",
    answers: [
        { answer: "4", correct: true },
        { answer: "5", correct: false }
    ]
}
```

2. **Questions with Explanations**:
```typescript
{
    question: "What is capital of Italy?",
    answers: [
        {
            answer: "Rome",
            correct: true,
            explanation: "Rome is the capital of Italy"
        },
        {
            answer: "Naples",
            correct: false,
            explanation: "Naples is the capital of Campania region"
        }
    ],
    explanation: "Rome is the capital city of Italy. It is also the capital of the Lazio region"
}
```

## Data Table Processing

We process Gherkin data tables to create test data:

```typescript
Then(/^I see the answer explanations for answers$/, async (data: DataTable) => {
    for (const row of data.rows()) {
        if (row[1]) {
            await expectTextToBe(
                world.quizTakingPage.answerExplanationLocatorForAnswer(row[0]),
                row[1]
            )
        } else {
            await expectThatIsNotVisible(
                world.quizTakingPage.answerExplanationLocatorForAnswer(row[0])
            )
        }
    }
})
```

Key patterns:
- Converts Gherkin tables to structured data
- Handles optional data (explanations)
- Combines data with page object methods
- Supports both presence and absence checks

## State Management

Our world object manages different types of state:

1. **Test Data State**:
   - Stored questions and answers
   - Bookmarks for reference
   - Active question tracking

2. **Page State**:
   - Current page object
   - Page URL
   - UI element state

3. **Test Execution State**:
   - Current scenario context
   - Shared helper functions
   - Common assertions

## Best Practices

1. **Clear Naming**:
   - Use descriptive bookmark names
   - Follow consistent naming patterns
   - Make data usage obvious in scenarios

2. **Data Independence**:
   - Each scenario manages its own data
   - Avoid dependencies between scenarios
   - Clean up data when necessary

3. **Type Safety**:
   - Use TypeScript interfaces
   - Validate data structure
   - Leverage IDE support

4. **Data Reusability**:
   - Use bookmarks for common test data
   - Share setup through Background
   - Maintain DRY principle in data creation

In the next chapter, we'll explore how step definitions use this test data to implement the actual test scenarios.
