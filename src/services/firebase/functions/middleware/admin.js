import admin from "firebase-admin";

const checkAdmin = async (req, res, next) => {
    try {
        const idToken = req.headers.authorization?.split("Bearer ")[1];

        if (!idToken) {
            return res.status(403).json({ error_message: "Unauthorized" });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);

        if (!decodedToken.isAdmin) {
            return res.status(403).json({ error_message: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        console.error("Error verifying admin:", error);
        return res.status(403).json({ error_message: "Invalid token" });
    }
};

export default checkAdmin;