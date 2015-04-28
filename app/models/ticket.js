module.exports = function(mongoose) {
    var ticketSchema = new mongoose.Schema({
        name: String,
        description: String,
        status: String,
        priority: String,
        assignee: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        project: {type: mongoose.Schema.Types.ObjectId, ref: "Project"}
    });

    return mongoose.model("Ticket", ticketSchema);
};