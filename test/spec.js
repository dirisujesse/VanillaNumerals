let converter = require("../index");

describe("Number Conversion Test", () => {
    it("returns failure message if provided input is non numeric or empty string", () => {
        let results = [
            converter.convertNum("", "and"),
            converter.convertNum("--1000", "and"),
            converter.convertNum("++1000", "and"),
            converter.convertNum("1000++", "and"),
            converter.convertNum("1000--", "and"),
            converter.convertNum("11abc", "and"),
            converter.convertNum("abc11", "and"),
        ];
        let isAllErrorMessage = results.every(it => it === "The provided value appears invalid, provide a valid number to convert");
        expect(isAllErrorMessage).toBe(true)
    });
    it("returns Zero if provided input is 0 or -0", () => {
        let results = [
            converter.convertNum("0", "and"),
            converter.convertNum("-0", "and"),
            converter.convertNum(0, "and"),
        ];
        let isAllErrorMessage = results.every(it => it.toUpperCase() === "ZERO");
        expect(isAllErrorMessage).toBe(true)
    });
    it("starts with Minus if input is less than 0", () => {
        let results = [
            converter.convertNum("-20", "and"),
            converter.convertNum("-1", "and"),
            converter.convertNum(-120000000, "and"),
        ];
        let isAllErrorMessage = results.every(it => it.toUpperCase().startsWith("MINUS"));
        expect(isAllErrorMessage).toBe(true)
    });
    it("handle decimals and returns post decimal numbers literally if they are not all zeros", () => {
        let results = [
            converter.convertNum("-20.001", "and"),
            converter.convertNum("100.222", "and"),
            converter.convertNum(200.102, "and"),
            converter.convertNum(200.002, "and"),
        ];
        let isAllErrorMessage = results.every(it => it.toUpperCase().includes("POINT"));
        expect(isAllErrorMessage).toBe(true)
    });
    it("handle decimals and does not return post decimal numbers literally if they are all zeros", () => {
        let results = [
            converter.convertNum("-20.000", "and"),
            converter.convertNum("100.0", "and"),
            converter.convertNum(200.00000000000, "and"),
        ];
        let isAllErrorMessage = results.every(it => !it.toUpperCase().includes("POINT"));
        expect(isAllErrorMessage).toBe(true)
    });
})