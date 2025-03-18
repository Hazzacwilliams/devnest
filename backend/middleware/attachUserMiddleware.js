const attachUserMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({ error: "Unauthorized!" });
    }
    req.userid = req.user.userid; // or however you reference the id on your user object
    next();
}

export default attachUserMiddleware;
