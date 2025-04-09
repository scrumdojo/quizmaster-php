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
    Given a question "What are cities in France?"
    * with answers:
      | London    |   |
      | Lyon      | * |
      | Paris     | * |
      | Toulouse  | * |
    * saved and bookmarked as "France cities"

Scenario: Quiz score all question are correct
  Given I visit the quiz "X" page
  When I answer "Blue"
  * I click the next button
  * I answer "Paris"
  * I click the next button
  When I check answer "Lyon,Paris,Toulouse"
  And I submit question
  And I click the evaluate button
  Then I see the result 3 correct out of 3, 100%, passed
  Then I see question 1 "Correct" "What is the standard colour of sky?" with feedback "Correct!,Correct!,Correct!,Correct!"
  Then I see question 2 "Correct" "What is capital of France?" with feedback "Correct!,Correct!,Correct!,Correct!"
  Then I see question 3 "Correct" "What are cities in France?" with feedback "Correct!,Correct!,Correct!,Correct!"

Scenario: Quiz score one question is inccorect
  Given I visit the quiz "X" page
  When I answer "Green"
  * I click the next button
  * I answer "Paris"
  * I click the next button
  When I check answer "London,Paris,Toulouse"
  And I submit question
  * I click the evaluate button
  Then I see the result 1 correct out of 3, 33%, failed
  Then I see question 1 "Incorrect" "What is the standard colour of sky?" with feedback "Correct!,Inorrect!,Incorrect!,Correct!"
  Then I see question 2 "Correct" "What is capital of France?" with feedback "Correct!,Correct!,Correct!,Correct!"
  Then I see question 3 "Incorrect" "What are cities in France?" with feedback "Incorrect!,Incorrect!,Correct!,Correct!"
