from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import sys

options = Options()
options.add_argument('--headless=new')

driver = webdriver.Chrome(
    service=ChromeService(ChromeDriverManager().install()),
    options=options
)

# if there are no CLI parameters
if len(sys.argv) <= 1:
    print('Ticker symbol CLI argument missing!')
    sys.exit(2)

# read the ticker from the CLI argument
ticker_symbol = sys.argv[1]

# build the URL of the target page
url = f'https://finance.yahoo.com/quote/{ticker_symbol}'

# initialize a web driver instance to control a Chrome window
driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
# set up the window size of the controlled browser
driver.set_window_size(1920, 1080)
# visit the target page
driver.get(url)

# scraping logic...

# close the browser and free up the resources
driver.quit()