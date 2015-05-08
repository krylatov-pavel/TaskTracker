var ConnectRoles = require("connect-roles");

var user = new ConnectRoles({
    failureHandler: function (req, res, action) {
        var accept = req.headers.accept || '';
        if (!req.isAuthenticated()){
            return res.status(401).send("Unauthenticated request");
        }
        res.status(403).send("Access Denied - You don\'t have permission to: " + action);
    }
});

user.use("authenticated", function (req) {
    if (req.isAuthenticated()) {
        return true;
    }
});

module.exports = user;