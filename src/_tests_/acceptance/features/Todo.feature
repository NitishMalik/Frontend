Feature: Add a Todo
    In order to create Todo items
    As a user
    I want to be able to add a Todo item to the list of current items

    Scenario: Add to the initial set
        Given I have 3 Todo's
        When I add one
        Then the total number of Todo's should be 4

    Scenario: Edit a todo
        Given Todo's title is "foo" and description is "foo"
        When I edit one
        Then the total number of Todo's should be 4

    Scenario: Delete a todo
        Given I have 3 Todo's
        When I delete one
        Then the total number of Todo's should be 2

    Scenario: Toggle a todo
        Given I have 3 Todo's
        When I toggle one
        Then the total number of Todo's should be 3

   

