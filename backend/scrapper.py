from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import re


options = Options()
options.add_argument("--headless")

driver = webdriver.Chrome(options=options)


def getProducts(product_name):
    driver.get(f"https://www.google.com/search?q={product_name}&udm=2")
    product_xpath = '//div[@class="eA0Zlc WghbWd FnEtTd mkpRId m3LIae RLdvSe qyKxnc ivg-i PZPZlf GMCzAd"]'
    product_list = driver.find_elements(By.XPATH, product_xpath)
    pr_data = []

    for product in product_list:
        # Extract the HTML of the product element
        html = product.get_attribute('outerHTML')

        # Extract image address using regex
        img_match = re.search(r'<img[^>]+src="([^"]+)"', html)
        img_url = img_match.group(1) if img_match else None

        # Extract item name using regex (alt attribute of img or aria-label)
        name_match = re.search(r'<img[^>]+alt="([^"]+)"', html)
        if not name_match:
            name_match = re.search(r'aria-label="([^"]+)"', html)
        item_name = name_match.group(1) if name_match else None 
        
        if item_name and item_name.endswith("..."):
            item_name = item_name[:-3]

        # Extract product url using regex (first <a href=...>)
        url_match = re.search(r'<a[^>]+href="([^"]+)"', html)
        url = url_match.group(1) if url_match else None

        pr_data.append({
            'image': img_url,
            'name': item_name,
            'url': url
        })
    return pr_data
## https://www.google.com/search?q=shirt&sca_esv=3c20d213f13eaa2a&oq=shirt&sclient=img&udm=2
## https://www.google.com/search?q=shirt&udm=2




# https://www.google.com/search?q=shirt&sca_esv=3c20d213f13eaa2a&sxsrf=AE3TifNyTAUWDOatiAZxE08QzXiZDG5L7A:1757874453470&source=hp&biw=807&bih=737&ei=FQnHaKPVGrOPseMPo5mW4Qc&iflsig=AOw8s4IAAAAAaMcXJamNXLomDzPobe-hV7kYHnGvhhgE&ved=0ahUKEwjjs-3S8NiPAxWzR2wGHaOMJXwQ4dUDCBc&uact=5&oq=shirt&gs_lp=EgNpbWciBXNoaXJ0MgcQIxgnGMkCMgcQIxgnGMkCMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIFEAAYgAQyBRAAGIAEMggQABiABBixAzIFEAAYgARI0WBQuANYvQlwAXgAkAEAmAG9AaABgweqAQMwLjW4AQPIAQD4AQGKAgtnd3Mtd2l6LWltZ5gCBqACnweoAgrCAgoQIxgnGMkCGOoCwgILEAAYgAQYsQMYgwHCAg4QABiABBixAxiDARiKBZgDCJIHAzEuNaAHxySyBwMwLjW4B5cHwgcFMC4yLjTIBxU&sclient=img&udm=2