var Project = require("../models/project");

function create(name){
    var project = new Project();

    project.name = name;
}