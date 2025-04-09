Feature: Quiz back navigation

  Scenario: Back button is not available on quiz first question
    Given I visit the quiz "X" page
    Then I should not see the back button

  Scenario: Back button is available on quiz second question
    Given I visit the quiz "X" page
    When I answer "Green"
    And I click the next question
    Then I should see the back button

  Scenario: Do not see back button button when go back to first question
    Given I visit the quiz "X" page
    When I answer "Green"
    And I click the next question
    And I click the back button
    Then I should see the "What is the standard colour of sky?" question
    Then I should not see the evaluate button
    Then I should see the next button
    Then I should not see the back button

  Scenario: See answered question when go back to previous question
    Given I visit the quiz "X" page
    When I answer "Green"
    And I click the next question
    And I click the back button
    Then I should see the "What is the standard colour of sky?" question
    Then I should see the answer "Green" selected
    Then I should see the answered question explanation
    Then I cannot change the answer
