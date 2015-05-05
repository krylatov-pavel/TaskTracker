module.exports = function(mongoose) {
    var encode = require('hashcode').hashCode;

    var userSchema = new mongoose.Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
    });

    userSchema.statics.create = function(email, plainPassword, firstName, lastName){
        var User = this;

        return this.findOne({email: email})
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
    };

    userSchema.methods.isValidPassword = function (plainPassword) {
        return this.password === encode().value(plainPassword).toString();
    };

    userSchema.pre("remove", function(next){
        mongoose.Schema("Project").removeAll({user: this._id}).exec();
        next();
    });

    return mongoose.model("User", userSchema);
};