/* 
    I must state that this solution is inspired by https://ourcodeworld.com/articles/read/353/how-to-convert-numbers-to-words-number-spelling-in-javascript
    I changed the parseInt call to the + literal to catch alphanumeric strings
    I implemented logic for handling numbers less than zero
    I implemented logic to handle decimals / floats
    I also parse the return string to be in title case
    I also changed var declarations to let declarations
*/

function convertNum(n, custom_join_character) {
    n = n.toString()
    let englishPhrase, preDecimal, postDecimal;
    if (n && +n === 0) {
        return "Zero";
    }
    if (!n || isNaN(+n)) {
        return "The provided value appears invalid, provide a valid number to convert";
    }
    let isSubZero = +n < 0;
    if (n.includes('.')) {
        let words = n.split('.');
        if (+words[1]) {
            preDecimal = handlePreDecimalNumber(words[0], custom_join_character);
            postDecimal = handleDecimal(words[1]);
            englishPhrase = `${isSubZero ? 'Minus ' : ''}${preDecimal} point ${postDecimal}`;
        } else {
            preDecimal = handlePreDecimalNumber(words[0], custom_join_character);
            englishPhrase = `${isSubZero ? 'Minus ' : ''}${preDecimal}`;
        }
    } else {
        preDecimal = handlePreDecimalNumber(n, custom_join_character);
        englishPhrase = `${isSubZero ? 'Minus ' : ''}${preDecimal}`;
    }
    return englishPhrase;
}

function handleDecimal(string) {
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

    return string.split('').map(wrd => numDict[wrd]).join(' ');
}

function handlePreDecimalNumber(string, custom_join_character) {
    let units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;
    let and = custom_join_character || 'and';
    units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

    start = string.length;
    chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
        return '';
    }

    words = [];
    for (i = 0; i < chunksLen; i++) {
        chunk = +chunks[i];
        if (chunk) {
            ints = chunks[i].split('').reverse().map(parseFloat);
            if (ints[1] === 1) {
                ints[0] += 10;
            }
            if ((word = scales[i])) {
                words.push(word);
            }
            if ((word = units[ints[0]])) {
                words.push(word);
            }
            if ((word = tens[ints[1]])) {
                words.push(word);
            }
            if (ints[0] || ints[1]) {
                if (ints[2] || !i && chunksLen) {
                    words.push(and);
                }

            }
            if ((word = units[ints[2]])) {
                words.push(word + ' hundred');
            }

        }

    }

    words = words.map(wrd => {
        if (wrd !== and) {
            return wrd.length > 1 ? `${wrd[0].toUpperCase()}${wrd.slice(1)}` : wrd.toString()
        } else {
            return wrd;
        }
    }).reverse().join(' ');
    return +string < 100 ? words.replace(custom_join_character, '') : words;
}

(() => {
    try {
        module.exports.convertNum = convertNum;
    } catch (e) {
        console.warn("We are in the browser");
    }
})()