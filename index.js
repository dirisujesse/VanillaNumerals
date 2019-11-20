let numInput = document.getElementById("num-input");
let submitBtn = document.getElementById("submit-btn");
let conversionHolder = document.getElementById("conversion-holder");

submitBtn.addEventListener("click", handleSubmit)

function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    let numString = numInput.value || null;
    if (numString && !isNaN(+numString)) {
        let num = Math.abs(+numString);
        if (num === 0) {
            conversionHolder.innerText = "Zero";
        } else {
            convertNum(num, "and", numString.startsWith("-"))
        }
    } else {
        alert("The provided value appears invalid, provide a valid number to convert");
    }
}

/* 
    I must state that this solution I saw at https://ourcodeworld.com/articles/read/353/how-to-convert-numbers-to-words-number-spelling-in-javascript
    I changed the parseInt call to the + literal to catch alphanumeric strings
    I added isSubZero argument to acccount for minus numbers
    I also changed var declarations to let declarations
*/

function convertNum(n, custom_join_character, isSubZero) {
    if (isNaN(+n)) {
        alert("The provided value appears invalid, provide a valid number to convert");
        return;
    }
    let string = n.toString();
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

    let englishPhrase = `${isSubZero ? 'Minus ' : ''}${words.reverse().join(' ')}`;
    conversionHolder.innerText = englishPhrase.toUpperCase();
}