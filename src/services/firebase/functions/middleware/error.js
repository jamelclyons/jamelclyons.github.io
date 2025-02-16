
const handler = async (err, req, res, next) => {
    try {
        let statusCode = res.statusCode !== 200 ? res.statusCode : 500; // Default to 500 if not set
        let message = err.message || 'Internal Server Error';

        res.status(statusCode).json({
            error_message: message,
        });
    } catch (error) {
        console.error("Error verifying admin:", error);
        return res.status(403).json({ error_message: "Invalid token" });
    }
};

export default handler;