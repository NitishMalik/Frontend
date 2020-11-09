'use strict'
const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const config = require('../../config/config');

const saveScreenshotWithName = (name) => {
    browser.saveScreenshot('./reports/' + browser.desiredCapabilities.browserName + "_" + name + ".png")
}

const self = {};
Given('I have {int} Todo\'s', function(initialTodoCount) {
    browser.url(config.baseUrl || 'http://localhost:3000');
    assert.equal(browser.getTitle(), 'Todo MVC Sample App');
    const actualTodoCount = browser.$$('div.todo').length;
    self.initialTodoCount = initialTodoCount;
    assert.equal(actualTodoCount, self.initialTodoCount);
    // example of how to save screenshots
    saveScreenshotWithName("TODO_init");
});

When('I add one', function () {
    browser.click('.todo-page-actions button');
    browser.setValue('input[placeholder=Title]', 'blah');
    browser.click('.actions button[type=primary]');
    self.finalTodoCount = browser.$$('div.todo').length;
});

Given(`Todo's title is {string} and description is {string}`, function (initialTodoTitle, initialTodoDescription) {
    self.initialTodoTitle = initialTodoTitle;
    self.initialTodoDescription = initialTodoDescription;
})

When('I edit one', function () {
    browser.click('i.todo-edit-icon');
    browser.setValue('input[placeholder=Title]', 'foo');
    browser.setValue('textarea[placeholder=Description]', 'foo');
    const inputValue = browser.getValue('.modal-todo-input input');
    const textareaValue = browser.getValue('.modal-todo-textarea textarea');
    browser.click('.actions .modal-todo-submit-button');
    assert.equal(inputValue, self.initialTodoTitle);
    assert.equal(textareaValue, self.initialTodoDescription);
    self.finalTodoCount = browser.$$('div.todo').length;
});

When('I delete one', function () {
    browser.click('.todo-delete-button');
    browser.alertAccept();
    self.finalTodoCount = browser.$$('div.todo').length;
});

When('I toggle one', function () {
    browser.click('.todo-toggle');
    const element = $('.todo-toggle input');
    assert.equal(element.isSelected(), true);
    browser.click('.todo-toggle');
    assert.equal(element.isSelected(), false);
    self.finalTodoCount = browser.$$('div.todo').length;
});

Then('the total number of Todo\'s should be {int}', function (expectedCount) {
    assert.equal(self.finalTodoCount, expectedCount);
});