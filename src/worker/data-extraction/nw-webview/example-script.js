let prices = [];

// Example: scrape all <h2> elements with the class "article-title"
let priceElements = document.querySelectorAll('.card-title.pricing-card-title');

priceElements.forEach((element) => {
  prices.push(element.textContent.trim());
});

prices;
