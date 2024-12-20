module.exports = {
    browser: "google chrome",     // Open Chrome browser
    open: true,
    watch: true,                   // Automatically open the browser
    server: {
        baseDir: ".",          // Serve files from the 'dist' folder (where Vite outputs)
    },
    cors: true,
    reloadOnRestart: true,
    notify: false,                // Disable BrowserSync "Connected" notification
    middleware: [
        function (req, res, next) {
            res.setHeader("Cache-Control", "no-store"); // Prevent caching issues
            next();
        },
    ],
};