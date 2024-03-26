
import axios from 'axios'
import cheerio from 'cheerio'

async function newscrape(ticker_symbol) {
    try {
        const response = await axios.get(`https://search.yahoo.com/search?p=${ticker_symbol}&fr=finance&fr2=p%3Afinvsrp%2Cm%3Asb`);
        
        const $ = cheerio.load(response.data);

        const headlines = [];
        const urls = [];

        $('article.content').each((index, element) => {
            // Extract headline and URL
            const headline = $(element).find('div.title > span.s-title').text().trim();
            const url = $(element).find('a.bkgLink').attr('href');

            headlines.push(headline);
            urls.push(url);
        });

        return { headlines, urls };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// const ticker_symbol = 'AAPL';
// scrapeYahooFinance(ticker_symbol)
//     .then(data => {
//         if (data) {
//             console.log('Headlines:', data.headlines);
//             console.log('URLs:', data.urls);
//         }
//     })
//     .catch(error => console.error('Error:', error));
