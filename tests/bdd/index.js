'use strict';
/* global require, describe, before, beforeEach, after, it */

require('../../app');

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var wd = require('wd');
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("using wd and chai-as-promised", function() {
  var browser;
  this.timeout(6000);

  before(function() {
    browser = wd.promiseChainRemote();

    return browser.init({browserName:'firefox'});
  });

  beforeEach(function() {
    return browser.get("http://localhost:3000/");
  });

  after(function() {
    return browser.quit();
  });

  it('displays a title and subtitle', function (done) {
    browser
      .title()
        .should.become('Scrum Cards Voting')
      .elementById('title').text()
        .should.become('Scrum Cards Voting')
      .elementById('subTitle').text()
        .should.become('Welcome to Scrum Cards Voting')
      .notify(done);
  });

  it('displays a login screen', function (done) {
    browser
      .elementByCss('.form-signin-heading').text()
        .should.become('Please sign in')
      .elementById('inputName')
        .should.eventually.exist
      .elementById('loginButton')
        .should.eventually.exist
      .notify(done);
  });

  it('hides everything else', function (done) {
    browser
      .elementById('storyChooshing')
        .getAttribute('style')
          .should.become('display: none;')
      .elementById('voting')
        .getAttribute('style')
          .should.become('display: none;')
    .notify(done);
  });

  it('should allow login to registered users', function (done) {
    browser
      .elementById('inputName')
        .keys('Jordi')
      .elementById('loginButton')
        .click()
      .elementById('userLogin')
        .getAttribute('style')
          .should.become('display: none;')
      .elementById('storyChooshing')
        .getAttribute('style')
          .should.become('display: block;')
    .notify(done);
  });

  it('should allow choosing a story', function (done) {
    browser
    .elementById('inputName')
      .keys('Jordi')
    .elementById('loginButton')
      .click(function () {
        browser
        .elementById('Story 1')
          .click()
        .elementById('loginButton')
          .click();
      })
      .elementById('userLogin')
        .getAttribute('style')
          .should.become('display: none;')
      .elementById('storyChooshing')
        .getAttribute('style')
          .should.become('display: none;')
      .elementById('voting')
        .getAttribute('style')
          .should.become('display: block;')
      .notify(done);
  });

  // it('should allow voting for a story', function (done) {
  //   browser
  //   .elementById('inputName')
  //     .keys('Jordi')
  //   .elementById('loginButton')
  //     .click(function () {
  //       browser
  //       .elementById('Story 1')
  //         .click()
  //       .elementById('loginButton')
  //         .click();
  //     })
  //   .elementById('voting')
  //     .should.eventually.include
  //     .click()
  //   // .elementById('votes')
  //   //   should.become()
  //   .done();
  // });

});
