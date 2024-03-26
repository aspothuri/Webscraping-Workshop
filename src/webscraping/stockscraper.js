//const axios = require('axios');
import axios from 'axios'
const cheerio = require('cheerio');
// import cheerio from 'cheerio'



async function stockscraper(tickerSymbol) {
    try {
        const response = await axios.get(`https://finance.yahoo.com/quote/${tickerSymbol}`);
        const $ = cheerio.load(response.data);

        // Extracting price
        const price = $("[data-test='qsp-price']").first().attr('value');
        // Extracting daily change
        const dailyChange = $('fin-streamer[data-symbol="' + tickerSymbol + '"][data-field="regularMarketChange"] > span').text().trim();

        // Extracting daily percent change
        const dailyPercentChange = $('fin-streamer[data-symbol="' + tickerSymbol + '"][data-field="regularMarketChangePercent"] > span').text().trim();

        return { name: tickerSymbol, price: price, percent: dailyPercentChange };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default stockscraper;

// // Example usage
// const tickerSymbol = 'AAPL'; // Replace with the desired stock ticker symbol
// getStockData(tickerSymbol)
//     .then(data => {
//         if (data) {
//             console.log('Price:', data.price);
//             console.log('Daily Change:', data.dailyChange);
//             console.log('Daily Percent Change:', data.dailyPercentChange);
//         }
//     })
//     .catch(error => console.error('Error:', error));