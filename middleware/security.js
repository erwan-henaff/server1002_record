exports.setCors = (req, res, next) => {
    res.header('Access.Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, x-Request-Width, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
    next();
}