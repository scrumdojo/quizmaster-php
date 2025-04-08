Feature: Quiz back navigation

  Scenario: Back button is not available on quiz first question
    Given I visit the quiz page
    Then I should not see the back button
