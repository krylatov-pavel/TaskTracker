module.exports = function (mongoose){
    var Schema = mongoose.Schema;

    var projectSchema = new Schema({
        name: String
    });

    return mongoose.model('Project', projectSchema);
}
