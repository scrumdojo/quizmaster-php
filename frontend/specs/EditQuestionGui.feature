Feature: Edit question GUI

  Background:
    Given a question "What is capital of Czech Republic?"
    * with answers:
      | Brno       |   | A |
      | Berlin     |   | B |
      | Bratislava |   | C |
      | Prague     | * | D |
    * saved and bookmarked as "Czechia"

  Scenario: Edit a single-choice question
    When I start editing question "Czechia"
    Then I see the question, answers and explanations
    When I change question to "What is capital of Slovakia?"
    And I save it
    Then I see unchanged url

  Scenario: Change of correct answer
    When I start editing question "Czechia"
    Then I see the question, answers and explanations
    When I change the correct answer to 2
    And I save it
    And I reload the page
    Then I see the question, answers and explanations
    And I see the correct answer is 2

  Scenario: All expolanations and general explanation are empty
    When I start editing question "Czechia"
    Then I see the question, answers and explanations
    When I delete all explanations and delete general explanation
    And I save it
    Then I see a link to take the question

  Scenario: Change of general explanation
    When I start editing question "Czechia"
    Then I see the question, answers and explanations
    When I change a general explanation to "Abcd"
    And I save it
    And I reload the page
    Then I see a general explanation the same as "Abcd"

  Scenario: Change of single answer explanation
    When I start editing question "Czechia"
    Then I see the question, answers and explanations
    When I change a single answer explanation 1 to "Abcd"
    And I save it
    And I reload the page
    Then I see changed explanation 1 to "Abcd"

  Scenario: Change of an answer label
    When I start editing question "Czechia"
    Then I see the question, answers and explanations
    When I change of an answer label 1 to "Abcd"
    And I save it
    And I reload the page
    Then I see a changed label 1 to "Abcd"

  Scenario: Multiple choice of correct answers
    When I start editing question "Czechia"
    Then I see the question, answers and explanations
    When I mark a multiple choice
    Then I see checkboxes for every answer
    When I mark 1 checkbox
    And I save it
    And I reload the page
    Then I see answer 1 with marked checkbox
    Then I see answer 3 with marked checkbox
