Feature: Take a quiz

   Background:
    Given a question "What is the standard colour of sky?"
    * with answers:
      | Red       |   |
      | Blue      | * |
      | Green     |   |
      | Black     |   |
    * saved and bookmarked as "Sky"
    Given a question "What is capital of France?"
    * with answers:
      | Marseille |   |
      | Lyon      |   |
      | Paris     | * |
      | Toulouse  |   |
    * saved and bookmarked as "France"
    # Given a quiz containing questions "Sky" and "France"

  Scenario: Quiz question is displayed and not answered
    Given I visit the quiz "X" page
    Then I see the question "Sky"
    And no answer is selected

Scenario: After page refresh no answer is selected
    Given I visit the quiz "X" page
    When I answer "Green"
    And I refresh page
    Then no answer is selected

Scenario: After next page is displayed, no answer and explanation is displayed
    Given I visit the quiz "X" page
    When I answer "Green"
    And I click the next button
    Then no answer is selected
    And no explanation answer is displayed
