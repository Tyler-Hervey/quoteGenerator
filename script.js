const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

// get quotes from api
function newQuote(quotes) {
  let quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = apiQuotes[quoteIndex];
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;

  if (quote.author !== null) {
    authorText.textContent = quote.author;
  } else {
    authorText.textContent = "Unknown";
  }
}

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes);
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
