# The majority of this program was taken from: https://github.com/goutamborthakur555/WebScraping-with-and-without-proxy/blob/master/WebScraping-Google-Images-Bulk-Downloader.py
# Author: Goutam Borthakur
# Title: Web Scrapping with and without proxy


import requests  # pip install requests #to sent GET requests
from bs4 import \
    BeautifulSoup  # pip install bs4 #to parse html(getting data out from html, xml or other markup languages)


# Google images link
Google_Image = \
    'https://www.google.com/search?site=&tbm=isch&source=hp&biw=1873&bih=990&'

# User agent is used to make HTTP request (can be found by typing 'my user agent' into google )
u_agnt = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
    'Accept-Encoding': 'none',
    'Accept-Language': 'en-US,en;q=0.8',
    'Connection': 'keep-alive',
} 

# Web scraping function
def search_for_images(Car_Name):

    # Concatenate the name of the car to the google images link
    search_url = Google_Image + 'q=' + Car_Name

    # Send get request to extract info from the HTML
    response = requests.get(search_url, headers=u_agnt)
    # Convert HTML data to text
    html = response.text 

    # Find all images and extract features from HTML files
    b_soup = BeautifulSoup(html, 'html.parser') 
    results = b_soup.findAll('img', {'class': 'rg_i Q4LuWd'})

    # Now extract the link to the image searched for
    count = 0
    
    for res in results:
        try:
            link = res['data-src']
            count = count + 1
            if (count >= 1):
                break
        except KeyError:
            continue

    return link