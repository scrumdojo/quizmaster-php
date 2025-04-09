Feature: Take a quiz

  Background:
    Given a question "What is the standard colour of sky?"
    * with answers:
      | Red   |   |
      | Blue  | * |
      | Green |   |
      | Black |   |
    * saved and bookmarked as "Sky"
    Given a question "What is capital of France?"
    * with answers:
      | Marseille |   |
      | Lyon      |   |
      | Paris     | * |
      | Toulouse  |   |
    * saved and bookmarked as "France"
    Given a question "What are cities in France?"
    * with answers:
      | London   |   |
      | Lyon     | * |
      | Paris    | * |
      | Toulouse | * |
    * saved and bookmarked as "France cities"
    Given a quiz "X" containing questions
      | Sky           |
      | France        |
      | France cities |

  Scenario: Quiz page is available
    Given I visit the quiz "X" page
    Then I should see heading "Quiz"

  Scenario Outline: Quiz question is displayed
    Given a quiz "Y" containing questions
      | France        |
      | Sky           |
    Given I visit the quiz "<quiz>" page
    Then I see the question "<question>"
    Examples:
      | quiz | question |
      | X    | Sky      |
      | Y    | France   |

  Scenario: Quiz question is answered
    Given I visit the quiz "X" page
    When I answer "Green"
    Then I should see the next button

  Scenario: Quiz question is answered and the next button is clicked
    Given I visit the quiz "X" page
    When I answer "Green"
    And I click the next button
    Then I should see the next question

  Scenario: User proceed to last question
    Given I visit the quiz "X" page
    When I answer "Green"
    And I click the next button
    Then I should see the next question
    Then I should not see the evaluate button
    When I answer "Lyon"
    And I click the next button
    When I check answer "Lyon,Paris,Toulouse"
    And I submit question
    Then I should see the evaluate button
    Then I should not see the next button

  Scenario: User navigate to evaluation page
    Given I visit the quiz "X" page
    When I answer "Green"
    And I click the next button
    Then I should see the next question
    Then I should not see the evaluate button
    When I answer "Lyon"
    And I click the next button
    When I check answer "Lyon,Paris,Toulouse"
    And I submit question
    Then I should see the evaluate button
    Then I click the evaluate button

  Scenario: User reloads page on answered question
    Given I visit the quiz "X" page
    When I answer "Green"
    * I click the next button
    * I check answer "Lyon,Paris"
    * I uncheck answer "Lyon"
    * I reload the page
    Then no answer is selected

  Scenario: Progress bar is shown on first quiz page
    Given I visit the quiz "X" page
    Then I should see the progress bar showing page 1 of 3

  Scenario: Progress bar is full on last quiz page
    Given I visit the quiz "X" page
    When I answer "Green"
    And I click the next button
    When I answer "Lyon"
    And I click the next button
    Then I should see the progress bar showing page 3 of 3
