module.exports = function (mongoose) {
    var projectSchema = new mongoose.Schema({
        name: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        statuses: {type: Array, default: ["todo", "in progress", "done"]},
        priorities: {type: Array, default: ["minor", "major", "critical"]}
    });

    return mongoose.model("Project", projectSchema);
};
