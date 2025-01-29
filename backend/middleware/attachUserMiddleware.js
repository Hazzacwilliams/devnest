const attachUserMiddleware = (req, res, next) => {
    if(!req.session || !req.session.userid){
        return res.status(500).json({ error: "Unauthorized!" });
    }
    req.userid = req.session.uderid;
    next();
}

export default attachUserMiddleware;