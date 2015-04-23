module.exports = function(mongoose) {
    var User = require("../models/user")(mongoose);
    var encode = require( 'hashcode' ).hashCode;

    return {
        create: create,
        readByEmail: readByEmail,
        readById: readById
    };

    function create(email, plainPassword, firstName, lastName) {
        return readByEmail(email)
            .then(function (user) {
                if (user) throw new Error("User with such email already exist");
            })
            .then(function () {
                var user = new User();

                user.email = email;
                user.password = encode().value(plainPassword);
                user.firstName = firstName;
                user.lastName = lastName;

                return user.saveQ();
            });
    }

    function readByEmail(email){
        return User.findOneQ({"email": email});
    }

    function readById(id){
        return User.findByIdQ(id);
    }
};