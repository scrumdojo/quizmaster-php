Feature: Create Quiz

  @skip
  Scenario: Create Quiz with 1 question
    Given a question "What is capital of Czech Republic?"
    * with answers:
      | Brno       |   | A |
      | Prague     | * | B |
    * saved and bookmarked as "Czechia"
    When I start creating a quiz
    * I add the question "Czechia" to the quiz
    * I save the quiz
    Then I see a confirmation message "Quiz created"
