'use strict';
/* global require, describe*/
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.should();

describe('Route tests', function () {
    require('./index_route')(sinon);
});
