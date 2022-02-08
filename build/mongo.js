"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
}
var password = process.argv[2];
var url = "mongodb+srv://fullstack:" + password + "@cluster0-ostce.mongodb.net/mickeylock.com?retryWrites=true";
mongoose_1.default.connect(url);
var noteSchema = new mongoose_1.default.Schema({
    content: String,
    date: Date,
    important: Boolean,
});
var Note = mongoose_1.default.model("Note", noteSchema);
var note = new Note({
    content: "HTML is Easy",
    date: new Date(),
    important: true,
});
note.save().then(function (result) {
    console.log("note saved!");
    mongoose_1.default.connection.close();
});
