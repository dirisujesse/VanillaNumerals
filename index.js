/*
*    Self Implemented solution to Number Conversion Problem
*    Solution leverages recursion
*    Author: Dirisu Jesse Bayodele
*/

const units = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
    'nine', 'ten','eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

const numDict = {
    "0": "Zero", "1": "One",
    "2": "Two", "3": "Three",
    "4": "Four", "5": "Five",
    "6": "Six", "7": "Seven",
    "8": "Eight", "9": "Nine",
}

const errors = {
    unsafeNum: "This is a pretty large number, don't expect much accuracy as our engine is not used to handling such massive figures",
    isNanOrInvalid: "The provided value appears invalid, provide a valid number to convert",
    unhandled: "Oops can't handle this, is this a valid number?, number may be too large",
};

// Scales correspond to lengths of numbers from thousands to centillions
// With sub scales corresponding to units tens and hundreds subscales within the number scales
const scales = [
    [ 4,  5,  6], [ 7,  8,  9], [10, 11, 12],
    [13, 14, 15], [16, 17, 18], [19, 20, 21],
    [22, 23, 24], [25, 26, 27], [28, 29, 30],
    [31, 32, 33], [34, 35, 36], [37, 38, 39], [40, 41, 42],
    [43, 44, 45], [46, 47, 48], [49, 50, 51],
    [52, 53, 54], [55, 56, 57], [58, 59, 60],
    [61, 62, 63], [64, 65, 66], [67, 68, 69]
];
const scaleNames = [
    'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion',
    'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion',
    'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion',
    'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'
];

function convertNum(n) {
    n = typeof n !== 'string' ? n.toString() : n;
    // We declare upperlimit variable to check for numbers greater han native JS number bound
    var upperLimit = (2 ** 53) - 1;
    if (Math.abs(+n) > upperLimit) {
        alert(errors.unsafeNum)
    }
    if (n && +n === 0) {
        return "Zero";
    }
    if (!n || isNaN(+n)) {
        return errors.isNanOrInvalid;
    }
    let isSubZero = n.startsWith('-');
    // pruning the ninus sign when the number is less than zero
    n = isSubZero ? n.slice(1) : n;
    if (n.includes('.')) {
        let preDecimal, postDecimal;
        let words = n.split('.');
        if (+words[1]) {
            preDecimal = convertPreDecimalNumber(words[0]);
            postDecimal = handleDecimal(words[1]);
            return `${isSubZero ? 'Minus ' : ''}${preDecimal || 'Zero'} point ${postDecimal}`;
        } else {
            preDecimal = convertPreDecimalNumber(words[0]);
            return `${isSubZero ? 'Minus ' : ''}${preDecimal || 'Zero'}`;
        }
    } else {
        let englishPhrase = convertPreDecimalNumber(n);
        return `${isSubZero ? 'Minus ' : ''}${englishPhrase || 'Zero'}`;
    }
}

function handleDecimal(string) {
    return string.split('').map(wrd => numDict[wrd]).join(' ');
}

function convertPreDecimalNumber(strng) {
    if (!+strng) {
        return '';
    }
    // I parse strng as BigInt to handle numbers beyond native JS Number range
    // Accuracy may be lost over (2**53) - 1 as JS cannot handle very large numbers
    const numString = BigInt(strng).toString();
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
    }  else {
        const numScale = scales.find(it => it.includes(lenNum));
        if (numScale && numScale !== undefined) {
            const scaleName = scaleNames[scales.indexOf(numScale)];
            if (scaleName && scaleName !== undefined) {
                return handleThanHundredNums(numString, lenNum, scaleName, numScale);
            }
        }
        return errors.unhandled;
    }
}

function handleThanHundredNums(numString, lenNum, scale, numRange) {
    const [minuend, startrange, midrange, _] = [numRange[0] - 1, ...numRange]
    const [H, T] = [
        lenNum === startrange ? 
            units[numString[0]] :
            lenNum === midrange ?
            convertPreDecimalNumber(numString.slice(0, 2)) :
            convertPreDecimalNumber(numString.slice(0, 3)), 
        BigInt(numString.slice(lenNum - minuend)).toString()
    ];
    const tailString = +T ? `${+T >= 100 ? '' : 'and'} ${convertPreDecimalNumber(T.toString())}`.trim() : '';
    return `${H} ${scale} ${tailString}`.trim()
}

(() => {
    try {
        module.exports.convertNum = convertNum;
    } catch (e) {
        console.warn("We are in the browser");
    }
})()
