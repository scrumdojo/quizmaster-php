Feature: Create question GUI

  Scenario: Add a single-choice question with 2 answers
    Given I start creating a question
    When I enter question "What is 2 + 2?"
    * I add the answer "4" marked as correct
    * I add the answer "5" marked as incorrect
    * I save the question
    Then I see a link to take the question
    When I take the question
    Then I see the question and the answers

  Scenario: Add a single-choice question for edit
    Given I start creating a question
    When I enter question "What is 2 + 2?"
    * I add the answer "4" marked as correct
    * I add the answer "5" marked as incorrect
    * I save the question
    Then I see a link to take the question
    * I see a link to edit the question
    When I edit the question
    Then I see the answers
    | 4     | * |
    | 5     |   |

  Scenario: Add a single-choice question with 3 answers
    Given I start creating a question
    When I enter question "What is 2 + 2?"
    * I add the answer "4" marked as correct
    * I add the answer "5" marked as incorrect
    * I add an additional answer field
    * I add the answer "6" marked as incorrect
    * I save the question
    Then I see a link to take the question
    When I take the question
    Then I see the question and the answers

  Scenario: Cannot save a question with no correct answer
    Given I start creating a question
    When I enter question "What is 2 + 2?"
    * I add the answer "5" marked as incorrect
    * I add the answer "6" marked as incorrect
    * I try saving the question
    Then I see an error message

  Scenario: Cannot save a question with less than 2 answers
    When I start creating a question
    Then I see 2 answers

  Scenario: Cannot save a question with 0 correct answers
    When I start creating a question
    * I try saving the question
    Then I see an error message

  Scenario: By default question is single-choice type
    Given I start creating a question
    Then Multiple choice is unchecked

  Scenario: Cannot save an empty question
    Given I start creating a question
    When I try saving the question
    Then I see empty question

  Scenario: Cannot save an empty answer
    Given I start creating a question
    When I enter question "What is XXX?"
    * I add the answer "" marked as correct
    * I try saving the question
    Then I see an error message

  Scenario: All or none explanation
      Given I start creating a question
      When I enter question "What is XXX?"
      * I add the answer "5" marked as correct with an explanantion ""
      * I add the answer "6" marked as incorrect with an explanantion "XXXX"
      * I try saving the question
      Then I see an error message
