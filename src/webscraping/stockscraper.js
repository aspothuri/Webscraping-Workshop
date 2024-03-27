import axios from 'axios'
import cheerio from 'cheerio'



async function stockscraper(tickerSymbol) {
    try {
        const targetUrl = `https://finance.yahoo.com/quote/${tickerSymbol}`;
        const url = 'https://corsproxy.io/?' + encodeURIComponent(targetUrl);
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const price = $("[data-test='qsp-price']").first().attr('value');
        const dailyChange = $('fin-streamer[data-symbol="' + tickerSymbol + '"][data-field="regularMarketChange"] > span').text().trim();

        const dailyPercentChange = $('fin-streamer[data-symbol="' + tickerSymbol + '"][data-field="regularMarketChangePercent"] > span').text().trim();
        console.log(tickerSymbol, dailyChange, dailyPercentChange);
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