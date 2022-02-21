const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// get quotes from api
function newQuote (quotes) {
    let quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = apiQuotes[quoteIndex];
    console.log(quote);
    quoteText.textContent = quote.text;

    if(quote.author !== null) {
        authorText.textContent = quote.author;
    }
}

async function getQuotes () {
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes =  await response.json();
        // console.log(apiQuotes);
        newQuote(apiQuotes);
    } catch(e) {
        // catch error here 

    }
}

getQuotes();