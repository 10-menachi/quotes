const openModalButton = document.querySelector('.open-modal');
const closeModalButton = document.querySelector('.close-modal');
const close = document.querySelector('.fa-circle-xmark');
const modal = document.querySelector('.modal-container');
const form = document.querySelector('form');
const quotes = document.querySelector('.quotes');
const dailyQuoteSection = document.querySelector('.daily-quotes-sec');
const favoritesSection = document.querySelector('.favorites-sec');
const quotesNav = document.querySelector('.quotes-nav');
const dailyQuotesNav = document.querySelector('.daily-quotes-nav');
const favoritesNav = document.querySelector('.favorites-nav');
let quoteList = [];

const getQuotes = () => {
  let savedQuotes = [];
  if (localStorage.getItem('quotes')) {
    savedQuotes = JSON.parse(localStorage.getItem('quotes'));
  }
  return savedQuotes;
};

quoteList = getQuotes();

const showQuotes = () => {
  if (quoteList.length === 0) {
    quotes.innerHTML = '<p class="no-quotes-display">No quotes added yet</p>';
  } else {
    quotes.innerHTML = '';
    quoteList.forEach((quoteItem) => {
      const quoteDiv = document.createElement('div');
      quoteDiv.classList.add('quote');
      quoteDiv.innerHTML = `
        <div class="quote-text-div">
          <p class="quote-text">${quoteItem.quote}</p>
          <i class="fa-regular fa-heart favorite"></i>
        </div>
        <p class="quote-author">Author: <strong>${quoteItem.author}</strong></p>
        <p class="quote-name">Added by: <strong>${quoteItem.name}</strong></p>
        <button class="button delete-quote">Delete Quote</button>
        `;
      quotes.appendChild(quoteDiv);

      const deleteButton = quoteDiv.querySelector('.delete-quote');
      deleteButton.addEventListener('click', () => {
        quoteList = quoteList.filter((quote) => quote.id !== quoteItem.id);
        localStorage.setItem('quotes', JSON.stringify(quoteList));
        showQuotes();
      });
    });
  }
};

showQuotes();

const addQuote = (quote, author, name) => {
  const quoteObj = {
    id: quoteList.length + 1,
    quote,
    author,
    name,
  };
  quoteList.push(quoteObj);
  localStorage.setItem('quotes', JSON.stringify(quoteList));
  showQuotes();
};

openModalButton.addEventListener('click', () => {
  modal.classList.toggle('open');
});

closeModalButton.addEventListener('click', () => {
  modal.classList.toggle('open');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const quote = formData.get('quote');
  const author = formData.get('author');
  addQuote(quote, author, name);
  form.reset();
});

close.addEventListener('click', () => {
  modal.classList.toggle('open');
});

const showDailyQuote = () => {
  dailyQuoteSection.style.display = 'flex';
  quotes.style.display = 'none';
  favoritesSection.style.display = 'none';
};

const showQuotesList = () => {
  dailyQuoteSection.style.display = 'none';
  quotes.style.display = 'flex';
  favoritesSection.style.display = 'none';
};

const showFavorites = () => {
  dailyQuoteSection.style.display = 'none';
  quotes.style.display = 'none';
  favoritesSection.style.display = 'flex';
};

quotesNav.addEventListener('click', showQuotesList);
dailyQuotesNav.addEventListener('click', showDailyQuote);
favoritesNav.addEventListener('click', showFavorites);
