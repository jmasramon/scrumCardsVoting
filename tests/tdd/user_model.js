module.exports = function (User){
    'use strict';
    var retrieved_users;

    before(function (done) {
      User.getUsers().addBack(function (err, users) {
        if (err) fail();
        retrieved_users = users;
        console.log('retrieved_users: ' + retrieved_users);
        done();
      });
    });

    describe('User Model', function () {
      it('should return the users from the db', function () {
        retrieved_users.length.should.equal(3);
        retrieved_users.forEach(function (user) {
          (user.name == 'Jordi' || user.name == 'Marc' || user.name == 'Marta').should.be.true;
        });
      });
    });
};
