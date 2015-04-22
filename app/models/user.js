module.exports = function(mongoose) {
    var userSchema = new mongoose.Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String
    });

    return mongoose.model("User", userSchema);
};