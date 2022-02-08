"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
// TODO
// User registration / login
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
var allowedOrigins = ["http://localhost:3000"]; // Not sure, if I need this line
var options = {
    origin: allowedOrigins,
};
app.use(cors_1.default(options));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    var _a;
    if (process.env.NODE_ENV === "production") {
        if (((_a = req.headers.host) === null || _a === void 0 ? void 0 : _a.slice(0, 4)) === "www.") {
            var newHost = req.headers.host.slice(4);
            return res.redirect(301, "https://" + newHost + req.originalUrl);
        }
        if (req.headers.host === "https://heroku-base-app-attempt-02.herokuapp.com/")
            return res.redirect(301, "https://www.mickeylock.com");
        if (req.headers["x-forwarded-proto"] !== "https")
            return res.redirect("https://" + req.headers.host + req.url);
        else
            return next();
    }
    else
        return next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build/")));
// TODO
// START HERE
exports.default = app;
