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

  Scenario Outline: Detailed feedback is displayed for each selected answer
    Answer is considered correct if and only if:
    - All correct answers are selected.
    - No incorrect answer is selected.

    When I take question "Europe"
    And I answer "<answer>"
    Then I see individual feedback:
      | answer  | evaluation | feedback           |
      | Italy   | <italy>    | <italy_feedback>   |
      | France  | <france>   | <france_feedback>  |
      | Morocco | <morocco>  | <morocco_feedback> |
      | Spain   | <spain>    | <spain_feedback>   |
    And I see the question explanation

    Examples:
      | answer                        | italy | italy_feedback | france | france_feedback | morocco | morocco_feedback | spain | spain_feedback | final_feedback                                            |
      | Italy                         |       |               | ❌      | Incorrect!      |        |                 | ❌     | Incorrect! | Italy, France, and Spain are in Europe. Morocco is in Africa. |
      | Italy, France                 |       |               |         |                 |        |                 | ❌     | Incorrect! | Italy, France, and Spain are in Europe. Morocco is in Africa. |
      | Italy, France, Morocco        |       |               |         |                 | ❌      | Incorrect!       | ❌     | Incorrect! | Italy, France, and Spain are in Europe. Morocco is in Africa. |
      | Italy, France, Spain          |       |               |         |                  |        |                  |        |             | Italy, France, and Spain are in Europe. Morocco is in Africa. |
      | Italy, France, Morocco, Spain |       |               |         |                 | ❌       | Incorrect!       |      |            | Italy, France, and Spain are in Europe. Morocco is in Africa. |
      | France, Morocco, Spain        | ❌   | Incorrect!     |         |                 | ❌       | Incorrect!       |      |             | Italy, France, and Spain are in Europe. Morocco is in Africa. |


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

