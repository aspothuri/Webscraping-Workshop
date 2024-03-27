
import axios from 'axios'
import cheerio from 'cheerio'

async function newsscraper(ticker_symbol) {
    try {
        const targetUrl = `https://search.yahoo.com/search?p=${ticker_symbol}&fr=finance&fr2=p%3Afinvsrp%2Cm%3Asb`;
        const url = 'https://corsproxy.io/?' + encodeURIComponent(targetUrl);
        const response = await axios.get(url);
        
        const $ = cheerio.load(response.data);

        const headlines = [];
        const urls = [];

        $('article.content').each((index, element) => {
            const headline = $(element).find('div.title > span.s-title').text().trim();
            const url = $(element).find('a.bkgLink').attr('href');

            headlines.push(headline);
            urls.push(url);
        });
        console.log(ticker_symbol, headlines, urls);
        return { headlines, urls };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default newsscraper;