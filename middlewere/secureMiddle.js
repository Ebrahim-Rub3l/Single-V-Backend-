const secureMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.json({
            success: false,
            message: "Token not found"
        });
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_SECRET, async function (err, decoded) {
        if (err) {
            return res.json({
                success: false,
                message: "Invalid Token"
            });
        }

        const userId = decoded.id;

        const existinguser = await User.findById(userId);

        if (!existinguser) {
            return res.json({
                success: false,
                message: "Invalid Token"
            });
        }


        next();
    });
};

module.exports = secureMiddleware;