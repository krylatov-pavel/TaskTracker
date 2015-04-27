module.exports = function(mongoose) {
    var randomString = require("random-string");

    var tokenSchema = mongoose.Schema({
        key: String,
        uid: mongoose.Schema.Types.ObjectId
    });

    tokenSchema.statics.issue = function (uid) {
        var token = new this();

        token.key = randomString({length: 64});
        token.uid = uid;

        return token.saveQ()
            .then(function () {
                return token;
            });
    };

    tokenSchema.statics.consume = function (tokenString) {
        return this.findOneAndRemoveQ({key: tokenString})
            .then(function (token) {
                if (!token){
                    return null;
                }
                return token.uid;
            });
    };

    return mongoose.model("Token", tokenSchema);
};