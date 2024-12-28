module.exports = {
    browser: "google chrome",
    proxy: "http://localhost:5173", // Vite's default development server URL
    port: 3000, // Port for BrowserSync
    open: true, // Automatically open the browser
    notify: false, // Disable BrowserSync notification popups
    files: [
      "src/**/*.{html,js,css,vue,jsx,tsx}", // Watch all files for changes
    ],     // Open Chrome browser
    watch: true,                   // Automatically open the browser
    cors: true,
    reloadOnRestart: true,
    notify: false,                // Disable BrowserSync "Connected" notification
    middleware: [
        function (req, res, next) {
            res.setHeader("Cache-Control", "no-store"); // Prevent caching issues
            next();
        },
    ],
    baseDir: "./", // Serve the main directory
    directory: true
};