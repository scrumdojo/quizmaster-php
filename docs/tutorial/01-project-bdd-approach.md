# Chapter 1: Project's BDD Approach

This chapter introduces how Behavior-Driven Development (BDD) is implemented in the QuizMaster project. Instead of generic BDD concepts, we'll focus on the specific patterns and practices used in our codebase.

## Feature File Organization

Our feature files are located in the `specs/` directory and follow a clear naming convention:
- `CreateQuestionGui.feature` - UI-focused creation scenarios
- `SingleChoiceQuestion.feature` - Single-choice question behavior
- `MultipleChoiceQuestion.feature` - Multiple-choice question behavior
- `EditQuestionGui.feature` - Question editing scenarios

### Basic Scenario Structure

Here's a typical scenario from our project:

```gherkin
Scenario: Add a single-choice question with 2 answers
  Given I start creating a question
  When I enter question "What is 2 + 2?"
  * I add the answer "4" marked as correct
  * I add the answer "5" marked as incorrect
  * I save the question
  Then I see a link to take the question
  When I take the question
  Then I see the question and the answers
```

Key points:
- Clear, business-focused scenario names
- Steps follow Given-When-Then pattern
- Uses `*` for consecutive steps of the same type (When in this case). `And` keyword can be used in the same way.
- Combines UI actions with functional validation

## Using Background for Setup

When multiple scenarios need the same setup, we use the Background section:

```gherkin
Background:
  Given a question "What is capital of France?"
  * with answers:
    | Marseille |   |
    | Lyon      |   |
    | Paris     | * |
    | Toulouse  |   |
  * saved and bookmarked as "France"
```

This pattern:
- Reduces repetition across scenarios
- Makes test data setup explicit
- Uses data tables for structured input
- Introduces our [bookmarking pattern](02-test-data-management.md#bookmarking-pattern) for test data reuse

## Data Tables and Scenario Outlines

We use data tables for structured input and scenario outlines for parameterized tests:

```gherkin
Scenario Outline: Feedback is displayed after answering the question
  Given I take question "France"
  When I answer "<answer>"
  Then I see feedback "<feedback>"
  Examples:
    | answer | feedback   |
    | Paris  | Correct!   |
    | Lyon   | Incorrect! |
```

Creates a scenario for each row in `Examples` section, and for each scenario fills in each `<placeholder>`
with a value from a corresponding column.

Benefits:
- Tests multiple cases with minimal code
- Makes test data explicit and easy to maintain
- Clearly shows the relationship between inputs and expected outputs

## Validation Scenarios

We also include scenarios that test validation rules:

```gherkin
Scenario: Cannot save a question with no correct answer
  Given I start creating a question
  When I enter question "What is 2 + 2?"
  * I add the answer "5" marked as incorrect
  * I add the answer "6" marked as incorrect
  * I try saving the question
  Then I see an error message
```

Key aspects:
- Tests business rules and constraints
- Uses clear step naming for negative scenarios ("try saving" vs "save")
- Validates error handling

## Best Practices from Our Features

1. **Scenario Independence**: Each scenario can run independently thanks to proper setup in Given steps or Background.

2. **Clear Business Value**: Scenarios focus on business requirements rather than technical implementation.

3. **Consistent Language**: We use consistent terminology across features (e.g., "marked as correct/incorrect", "take question").

4. **Data Management**: We use bookmarks to name and reference test data across scenarios.

5. **Validation Coverage**: We include both happy path and error scenarios.

In the next chapter, we'll dive into how we manage test data using the World object and TypeScript interfaces.
