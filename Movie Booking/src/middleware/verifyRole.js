export const verifyRole = (...arg) => {
    return (req, res, next) => {
        try {
            if (!req.user || !req.user.role) {
                return res.status(401).json({ success: false, message: "Unauthorized: User role not found" });
            }

            if (arg.includes(req.user.role)) {
                next();
            } else {
                return res.status(403).json({ success: false, message: "Access Denied: You do not have permission" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "Role Verification Error" });
        }
    }
};