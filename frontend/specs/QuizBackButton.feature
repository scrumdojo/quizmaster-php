Feature: Quiz back navigation

  Scenario: Back button is not available on quiz first question
    Given I visit the quiz "X" page
    Then I should not see the back button

  Scenario: Back button is available on quiz second question
    Given I visit the quiz page
    When I answer "Green"
    And I click the next question
    Then I should see the back button

  Scenario: See the correct buttons when go back to previous question
    Given I visit the quiz page
    When I answer "Green"
    And I click the next question
    And I click the back button
    Then I should see the "What is the standard colour of sky?" question
    Then I should not see the evaluate button
    Then I should see the next button
    Then I should not see the back button
