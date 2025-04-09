Feature: Take an end feedback quiz
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
    Given a question "What are cities in France?"
    * with answers:
      | London    |   |
      | Lyon      | * |
      | Paris     | * |
      | Toulouse  | * |
    * saved and bookmarked as "France cities"

  Scenario: End Feedback Quiz question is answered and the next button is clicked
    Given I visit the end feedback quiz page
    Then I should see the next button
    Then I should not see the submit button
    When I answer "Green"
    Then I should see the next question

  Scenario: Going back in End Feedback Quiz does not show results
    Given I visit the end feedback quiz page
    When I answer "Green"
    Then I click the back button
    Then I do not see any feedback
    Then I do not see the answer explanation

  Scenario: Going back in End Feedback Quiz allows change of answered questions
    Given I visit the end feedback quiz page
    When I answer "Green"
    Then I click the back button
    Then I can change the answer
