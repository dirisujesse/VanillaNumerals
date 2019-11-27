let converter = require("../index");

describe("Number Conversion Test", () => {
    it("returns failure message if provided input is non numeric or empty string", () => {
        let results = [
            converter.convertNum(""),
            converter.convertNum("--1000"),
            converter.convertNum("++1000"),
            converter.convertNum("1000++"),
            converter.convertNum("1000--"),
            converter.convertNum("11abc"),
            converter.convertNum("abc11"),
        ];
        let isAllErrorMessage = results.every(it => it === "The provided value appears invalid, provide a valid number to convert");
        expect(isAllErrorMessage).toBe(true)
    });
    it("returns Zero if provided input is 0 or -0", () => {
        let results = [
            converter.convertNum("0"),
            converter.convertNum("-0"),
            converter.convertNum(0),
        ];
        let isAllErrorMessage = results.every(it => it.toUpperCase() === "ZERO");
        expect(isAllErrorMessage).toBe(true)
    });
    it("starts with Minus if input is less than 0", () => {
        let results = [
            converter.convertNum("-20"),
            converter.convertNum("-1"),
            converter.convertNum(-120000000),
        ];
        let isAllErrorMessage = results.every(it => it.toUpperCase().startsWith("MINUS"));
        expect(isAllErrorMessage).toBe(true)
    });
    it("handle decimals and returns post decimal numbers literally if they are not all zeros", () => {
        let results = [
            converter.convertNum("-20.001"),
            converter.convertNum("100.222"),
            converter.convertNum(200.102),
            converter.convertNum(200.002),
        ];
        let isAllErrorMessage = results.every(it => it.toUpperCase().includes("POINT"));
        expect(isAllErrorMessage).toBe(true)
    });
    it("handle decimals and does not return post decimal numbers literally if they are all zeros", () => {
        let results = [
            converter.convertNum("-20.000"),
            converter.convertNum("100.0"),
            converter.convertNum(200.00000000000),
        ];
        let isAllErrorMessage = results.every(it => !it.toUpperCase().includes("POINT"));
        expect(isAllErrorMessage).toBe(true)
    });
})