'use strict';
/* global require, describe, it */

module.exports = function (sinon) {

  describe('Blog Index route', function () {
    it('should render the index jade',function () {
      var routes = require('../../routes')();
      var mock_req = {};
      var mock_res = {};
      var mock_next = function () {};

      mock_res.render = sinon.spy();

      routes.index(mock_req, mock_res, mock_next);
      mock_res.render.should.have.been.calledOnce;

      var args = mock_res.render.getCall(0).args;
      args.length.should.equal(2);

      // 'index', { title: 'Scrum Cards Voting' }
      args[0].should.a.string;
      args[0].should.equal('index');
      args[1].should.be.an.object;
      args[1].title.should.equal('Scrum Cards Voting');
    });
  });
};
