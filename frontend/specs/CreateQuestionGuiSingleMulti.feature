Feature: Create question GUI - Single/multi choice

  Scenario: By default question is single-choice type
    Given I start creating a question
    Then Multiple choice is unchecked

  Scenario: Mark correct answer for single choice question
    Given I start creating a question
    * with answers:
    | Brno       |   | |
    | Berlin     |   | |
    | Bratislava |   | |
    When I click is-correct checkbox for "Berlin"
    Then I see the answers
    | Brno       |   |
    | Berlin     | * |
    | Bratislava |   |

  Scenario: Click the same option of single choice question
    Given I start creating a question
    * with answers:
    | Brno       |   | |
    | Berlin     | * | |
    | Bratislava |   | |
    When I click is-correct checkbox for "Berlin"
    Then I see the answers
    | Brno       |   |
    | Berlin     | * |
    | Bratislava |   |

  Scenario: Click another option of single choice question
    Given I start creating a question
    * with answers:
    | Brno       |   | |
    | Berlin     | * | |
    | Bratislava |   | |
    When I click is-correct checkbox for "Brno"
    Then I see the answers
    | Brno       | * |
    | Berlin     |   |
    | Bratislava |   |

  Scenario: Switching from single to multi-choice question keeps correct answer selected
    Given I start creating a question
    * with answers:
    | Brno       |   | |
    | Berlin     | * | |
    | Bratislava |   | |
    When I make the question multi-choice
    Then I see the answers
    | Brno       |   |
    | Berlin     | * |
    | Bratislava |   |

  Scenario: Switching from multiple to single-choice question keeps correct answer selected if it is the only one
    Given I start creating a question
    * with multi-choice selected
    * with answers:
    | Brno       |   | |
    | Berlin     | * | |
    | Bratislava |   | |
    When I make the question single-choice
    Then I see the answers
    | Brno       |   |
    | Berlin     | * |
    | Bratislava |   |

  Scenario: Switching from multiple to single-choice question clears all is-correct checkboxes if multiple answers are selected
    Given I start creating a question
    * with multi-choice selected
    * with answers:
    | Brno       | * | |
    | Berlin     | * | |
    | Bratislava |   | |
    When I make the question single-choice
    Then I see the answers
    | Brno       |   |
    | Berlin     |   |
    | Bratislava |   |

  Scenario: Switching from multiple to single-choice question marks the last selected answer as correct
    Given I start creating a question
    * with multi-choice selected
    * with answers:
    | Brno       |   | |
    | Berlin     |   | |
    | Bratislava |   | |
    When I click is-correct checkbox for "Bratislava"
    Then I see the answers
    | Brno       |   |
    | Berlin     |   |
    | Bratislava | * |

  Scenario: Mark all answers as correct for multi-choice question
    Given I start creating a question
    * with multi-choice selected
    * with answers:
    | Brno       | * | |
    | Berlin     | * | |
    | Bratislava |   | |
    When I click is-correct checkbox for "Bratislava"
    Then I see the answers
    | Brno       | * |
    | Berlin     | * |
    | Bratislava | * |

  Scenario: Switching from multiple to single-choice question keeps the first selected answer as correct
    Given I start creating a question
    * with multi-choice selected
    * with answers:
    | Brno       | * | |
    | Berlin     |   | |
    | Bratislava | * | |
    When I click is-correct checkbox for "Bratislava"
    Then I see the answers
    | Brno       | * |
    | Berlin     |   |
    | Bratislava |   |

  Scenario: Single choice question markers are round
    Given I start creating a question
    * with multi-choice selected
    * with answers:
    | Brno       | * | |
    | Berlin     |   | |
    | Bratislava |   | |
    When I make the question single-choice
    Then Is correct checkboxes look like radio buttons
