module.exports = function(mongoose) {
    var userSchema = new mongoose.Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String
    });

    userSchema.methods.isValidPassword = function (plainPassword) {
        var encode = require('hashcode').hashCode;
        return this.password === encode().value(plainPassword).toString();
    };

    return mongoose.model("User", userSchema);
};