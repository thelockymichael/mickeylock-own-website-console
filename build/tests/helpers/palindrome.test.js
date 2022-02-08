"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var for_testing_1 = require("../../utils/for_testing");
test("palindrome of a", function () {
    var result = for_testing_1.palindrome("a");
    expect(result).toBe("a");
});
test("palindrome of react", function () {
    var result = for_testing_1.palindrome("react");
    expect(result).toBe("tcaer");
});
test("palindrome of saippuakauppias", function () {
    var result = for_testing_1.palindrome("saippuakauppias");
    expect(result).toBe("saippuakauppias");
});
