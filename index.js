/*
*    Self Implemented solution to Number Conversion Problem
*    Solution leverages recursion
*    Author: Dirisu Jesse Bayodele
*/

let units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
let tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
let numDict = {
    "0": "Zero",
    "1": "One",
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
}

function convertNum(n) {
    var upperLimit = 2 ** 53 - 1;
    var isUnsafe = false;
    if (n > upperLimit) {
        isUnsafe = true
        alert("This is a pretty large number, don't expect much accuracy as our engine is not used to handling such massive figures")
    }
    n = !isUnsafe ? n.toString() : BigInt(n).toString();
    let englishPhrase, preDecimal, postDecimal;
    if (n && +n === 0) {
        return "Zero";
    }
    if (!n || isNaN(+n)) {
        return "The provided value appears invalid, provide a valid number to convert";
    }
    let isSubZero = n.startsWith('-');
    n = isSubZero ? n.slice(1) : n;
    if (n.includes('.')) {
        let words = n.split('.');
        if (+words[1]) {
            preDecimal = convertPreDecimalNumber(words[0]);
            postDecimal = handleDecimal(words[1]);
            englishPhrase = `${isSubZero ? 'Minus ' : ''}${preDecimal || 'Zero'} point ${postDecimal}`;
        } else {
            preDecimal = convertPreDecimalNumber(words[0]);
            englishPhrase = `${isSubZero ? 'Minus ' : ''}${preDecimal || 'Zero'}`;
        }
    } else {
        preDecimal = convertPreDecimalNumber(n);
        englishPhrase = `${isSubZero ? 'Minus ' : ''}${preDecimal || 'Zero'}`;
    }
    return englishPhrase;
}

function handleDecimal(string) {
    return string.split('').map(wrd => numDict[wrd]).join(' ');
}

function convertPreDecimalNumber(strng) {
    if (!+strng) {
        return '';
    }
    // I parse strng as BigInt to handle numbers beyond native JS Number range
    // Accuracy is lost as JS cannot handle very large numbers
    strng = BigInt(+strng).toString()
    const numString = strng;
    const lenNum = numString.length;
    if (lenNum === 1 || +numString <= 19) {
        return units[+numString];
    } else if (lenNum === 2) {
        return `${tens[+numString[0]]} ${units[+numString[1]]}`.trim()
    } else if (lenNum === 3) {
        let [H, T] = [numString[0], +numString.slice(1)];
        let tailString = convertPreDecimalNumber(T.toString());
        tailString = tailString ? `and ${tailString}` : '';
        return `${units[H]} Hundred ${tailString}`.trim()
    } else if ([4, 5, 6].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Thousand", [4, 5, 6]);
    } else if ([7, 8, 9].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Million", [7, 8, 9]);
    } else if ([10, 11, 12].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Billion", [10, 11, 12]);
    } else if ([13, 14, 15].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Trillion", [13, 14, 15]);
    } else if ([16, 17, 18].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Quadrillion", [16, 17, 18]);
    } else if ([19, 20, 21].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Quintillion", [19, 20, 21]);
    } else if ([22, 23, 24].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Sextillion", [22, 23, 24]);
    } else if ([25, 26, 27].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Septillion", [25, 26, 27]);
    } else if ([28, 29, 30].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Octillion", [28, 29, 30]);
    } else if ([31, 32, 33].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Nonillion", [31, 32, 33]);
    } else if ([34, 35, 36].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Decillion", [34, 35, 36]);
    } else if ([37, 38, 39].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Undecillion", [37, 38, 39]);
    } else if ([40, 41, 42].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Duodecillion", [40, 41, 42]);
    } else if ([43, 44, 45].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Tredecillion", [43, 44, 45]);
    } else if ([46, 47, 48].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Quattuordecillion", [46, 47, 48]);
    } else if ([49, 50, 51].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Quindecillion", [49, 50, 51]);
    } else if ([52, 53, 54].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Sexdecillion", [52, 53, 54]);
    } else if ([55, 56, 57].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Septendecillion", [55, 56, 57]);
    } else if ([58, 59, 60].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Octodecillion", [58, 59, 60]);
    } else if ([61, 62, 63].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Novemdecillion", [61, 62, 63]);
    } else if ([64, 65, 66].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Vigintillion", [64, 65, 66]);
    } else if ([67, 68, 69].includes(lenNum)) {
        return handleThanHundredNums(numString, lenNum, "Centillion", [67, 68, 69]);
    } else {
        return "Oops that's a large one, our beta app can't handle such massive numbers";
    }
}

function handleThanHundredNums(numString, lenNum, scale, numRange) {
    const [minuend, startrange, midrange, _] = [numRange[0] - 1, ...numRange]
    const [H, T] = [lenNum === startrange ? units[numString[0]] : lenNum === midrange ? convertPreDecimalNumber(numString.slice(0, 2)) : convertPreDecimalNumber(numString.slice(0, 3)), +numString.slice(lenNum - minuend)];
    const tailString = T ? `${T >= 100 ? '' : 'and'} ${convertPreDecimalNumber(T.toString())}`.trim() : '';
    return `${H} ${scale} ${tailString}`.trim()
}

(() => {
    try {
        module.exports.convertNum = convertNum;
    } catch (e) {
        console.warn("We are in the browser");
    }
})()
