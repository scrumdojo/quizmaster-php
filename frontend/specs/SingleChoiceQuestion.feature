Feature: Create a quiz question

  Background:
    Given a question "What is capital of France?"
    * with answers:
      | Marseille |   |
      | Lyon      |   |
      | Paris     | * |
      | Toulouse  |   |
    * saved and bookmarked as "France"

  Scenario: Question is created and available to be taken
    Given I take question "France"
    Then I see the question and the answers

  Scenario Outline: Feedback is displayed after answering the question
    Given I take question "France"
    When I answer "<answer>"
    Then I see feedback "<feedback>"
    Examples:
      | answer | feedback   |
      | Paris  | Correct!   |
      | Lyon   | Incorrect! |

  Scenario Outline: Explanation for answered question is displayed after answering it
    Given a question "What is capital of Italy?"
    * with answers:
      | Rome     | * | Rome is the capital of Italy              |
      | Naples   |   | Naples is the capital of Campania region  |
      | Florence |   | Florence is the capital of Tuscany region |
      | Palermo  |   | Palermo is the capital of Sicily region   |
    * with explanation "Rome is the capital city of Italy. It is also the capital of the Lazio region"
    * saved and bookmarked as "Italy"
    When I take question "Italy"
    * I answer "<answer>"
    Then I see feedback "<feedback>"
    * I see the answer explanation "<explanation>"
    * I see the question explanation
    Examples:
      | answer | feedback   | explanation                              |
      | Rome   | Correct!   | Rome is the capital of Italy             |
      | Naples | Incorrect! | Naples is the capital of Campania region |
  @focus
  Scenario: Question is answered and the next button is not displayed
    Given a question "What is capital of Italy?"
    * with answers:
      | Rome     | * | Rome is the capital of Italy              |
      | Naples   |   | Naples is the capital of Campania region  |
      | Florence |   | Florence is the capital of Tuscany region |
      | Palermo  |   | Palermo is the capital of Sicily region   |
    * with explanation "Rome is the capital city of Italy. It is also the capital of the Lazio region"
    * saved and bookmarked as "Italy"
    When I take question "Italy"
    * I answer "Rome"
    Then I should not see the next button
