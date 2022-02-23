const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')
let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// get quotes from api
function newQuote(quotes) {
    loading();
  let quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = apiQuotes[quoteIndex];
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
// set text
  quoteText.textContent = quote.text;

  if (quote.author !== null) {
    authorText.textContent = quote.author;
  } else {
    authorText.textContent = "Unknown";
  }
// hide loader
    complete();

}

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  loading();
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    complete();
    newQuote(apiQuotes);
  } catch (e) {
    // catch error here
    console.log(e);
  }
}

// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} – ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuotes);

getQuotes();
