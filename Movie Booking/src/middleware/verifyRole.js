export const verifyRole = (...arg) => {
        return async (req, res, next) => {
            if(arg.includes(req.user.role)) next();
            else return res.status(400).json({ success: false, message: "invalid user..." });
        }
};