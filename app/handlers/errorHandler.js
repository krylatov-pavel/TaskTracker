module.exports = function (err, req, res, next) {
    res.status(err.status || 500)
        .send({
            message: err.message,
            stack: err.stack
        });
};