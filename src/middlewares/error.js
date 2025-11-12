module.exports = (err, req, res, next) => {
    console.error(err);
    const code = err.statusCode || 500;
    res.status(code).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: code
        }
    });
};