Feature: Evaluate quiz score

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

Scenario: Quiz score all question are correct
  Given I visit the quiz page
  When I answer "Blue"
  * I click the next button
  * I answer "Paris"
  * I click the evaluate button
  Then I see the result 2 correct out of 2, 100%, passed

Scenario: Quiz score one question is inccorect
  Given I visit the quiz page
  When I answer "Green"
  * I click the next button
  * I answer "Paris"
  * I click the evaluate button
  Then I see the result 1 correct out of 2, 50%, failed


