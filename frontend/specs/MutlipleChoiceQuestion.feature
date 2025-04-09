Feature: Answering a quiz question with multiple choice

  Background:
    Given a question "What countries are in Europe?"
    * with answers:
      | Italy   | * | Although it lies beyond the Alps, in the middle of its capital city lies the Vatican, the cradle of European Christianity. |
      | France  | * | This country is one of the founders of the European Union.        |
      | Morocco |   | Is on Afrika     |
      | Spain   | * | This country is located on the Iberian Peninsula, which is part of the European continent.          |
    * with explanation "Italy, France, and Spain are in Europe. Morocco is in Africa."
    * saved and bookmarked as "Europe"

    Given a question "What is right?"
    * with answers:
      | Right   | * |  |
      | Wrong  | * |  |
    * with explanation "Right is Right, Wrong is Wrong"
    * saved and bookmarked as "Right"

  Scenario Outline: Detailed feedback is displayed for each selected answer
    Answer is considered correct if and only if:
    - All correct answers are selected.
    - No incorrect answer is selected.

    When I take question "Europe"
    And I answer "<answer>"
    Then I see individual feedback:
      | answer  | evaluation |
      | Italy   | <italy>    |
      | France  | <france>   |
      | Morocco | <morocco>  |
      | Spain   | <spain>    |
    And I see the question explanation

    Examples:
      | answer                        | italy      | france     | morocco    | spain |
      | Italy                         | correct    | incorrect  | correct    | incorrect |
      | Italy, France                 | correct    | correct    | correct    | incorrect |
      | Italy, France, Morocco        | correct    | correct    | incorrect  | incorrect |
      | Italy, France, Spain          | correct    | correct    | correct    | correct |
      | Italy, France, Morocco, Spain | correct    | correct    | incorrect  | correct |
      | France, Morocco, Spain        | incorrect  | correct    | incorrect  | correct |


  Scenario: Explanations for all answers are displayed after answering the question
    When I take question "Europe"
    And I answer "France, Morocco, Spain"
    Then I see the answer explanations for answers
      | answer  | explanation      |
      | Italy   | Although it lies beyond the Alps, in the middle of its capital city lies the Vatican, the cradle of European Christianity. |
      | France  | This country is one of the founders of the European Union.        |
      | Morocco | Is on Afrika      |
      | Spain   | This country is located on the Iberian Peninsula, which is part of the European continent.         |
    And I see the question explanation

  Scenario: No explanations are displayed after answering the question
    When I take question "Right"
    And I answer "Right, Wrong"
    Then I do not see the answer explanation
      | answer |
      | Right |
      | Wrong |
    And I see the question explanation
