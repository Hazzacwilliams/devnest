const attachUserMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({ error: "Unauthorized!" });
    }
    req.userid = req.user.userid; 
    next();
}

export default attachUserMiddleware;
