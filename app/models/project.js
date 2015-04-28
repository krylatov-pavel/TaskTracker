module.exports = function (mongoose) {
    var projectSchema = new mongoose.Schema({
        name: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        statuses: {type: Array, default: ["todo", "in progress", "done"]},
        priorities: {type: Array, default: ["minor", "major", "critical"]},
        tickets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'}]
    });

    projectSchema.statics.create = function create(name, uid) {
        var project = new Project();

        project.name = name;
        project.user = uid;

        return project.saveQ();
    };

    projectSchema.pre("remove", function (next) {
        mongoose.Schema("Ticket").removeAll({project: this._id});
    });

    return mongoose.model("Project", projectSchema);
};
