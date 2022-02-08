"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.average = exports.palindrome = void 0;
var palindrome = function (string) {
    return string.split("").reverse().join("");
};
exports.palindrome = palindrome;
var average = function (array) {
    var reducer = function (sum, item) {
        return sum + item;
    };
    return array.reduce(reducer, 0) / array.length;
};
exports.average = average;
