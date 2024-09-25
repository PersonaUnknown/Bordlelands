import time
import json
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup

def download_page(url):
    req = requests.get(url)
    return req.content

def parse_named_enemies():
    games = [
        "borderlands-1",
        # "borderlands-2",
        "borderlands-3",
        "borderlands-tps",
        "wonderlands"
    ]

    for game in games:
        named_enemies = []
        encountered_named_enemies = []
        json_path = f"./weapons/{game}-weapons.json"
        with open(json_path, 'r') as file:
            data = json.load(file)
        for item in data:
            sources = item['drop-sources']
            for source in sources:
                if source in encountered_named_enemies:
                    continue
                print("Checking " + source)
                # Search for loot source
                search_query = source.replace(" ", "+")
                optional_enemy_query = "+enemy" if  "Quest" not in source and "Challenge" not in source and "Vendor" not in source else ""
                search_url = f"https://www.lootlemon.com/search?query={search_query}{optional_enemy_query}"
                search_contents = download_page(search_url)
                search_soup = BeautifulSoup(search_contents, "html.parser")
                search_result = search_soup.find("div", {"id":"search-results"})
                first_search_result = search_result.find("a")["href"]
                # Parse data from loot source
                loot_source_url = f"https://www.lootlemon.com{first_search_result}"
                loot_source_contents = download_page(loot_source_url)
                loot_source_soup = BeautifulSoup(loot_source_contents, "html.parser")
                name = loot_source_soup.find("h1", {"class":"article_heading"}).find_all("span")[1].text.strip()
                location = loot_source_soup.find("div", {"id":"source-location"})
                if location == None:
                    print(f"Checking {source} resulted in {loot_source_url} with no valid location")
                    continue
                location = location.text.strip()
                image = loot_source_soup.find("img", {"class":"article_thumbnail-background"})["src"]
                source_type = loot_source_soup.find("div", {"id":"source-type"}).text.strip()
                # Create JSON Entry
                encountered_named_enemies.append(source)
                current_source_data = {
                    "name": name,
                    "game": game,
                    "location": location,
                    "image": image,
                    "status": source_type
                }
                named_enemies.append(current_source_data)
        with open(f"./{game}-named-enemies.json", "w") as weapon_list: 
            json.dump(named_enemies, weapon_list, indent=4)

def parse_loot_database():
    og_url = "https://www.lootlemon.com"
    base_url = "https://www.lootlemon.com/db"
    games = [
        "borderlands-1",
        "borderlands-2",
        "borderlands-3",
        "borderlands-tps",
        "wonderlands"
    ]

    for game in games:
        # Get the weapons list
        init_url = f"{base_url}/{game}/weapons"
        db_content = download_page(init_url)
        content_soup = BeautifulSoup(db_content, "html.parser")
        # Get the other available items
        available_items = []
        game_items = content_soup.find("nav", {"class": "tool-page_button-row"}).find_all("a", href=True)
        for item in game_items:
            available_items.append(item['href'])
        # Iterate through available item categories
        for available_item in available_items:
            item_url = f"{og_url}{available_item}"
            if "weapon" in available_item:
                parse_item_data(item_url, game, "weapons")
            elif "shield" in available_item or "ward" in available_item:
                parse_item_data(item_url, game, "shields")
            elif "grenade" in available_item:
                parse_item_data(item_url, game, "grenades")
            elif "spell" in available_item:
                parse_item_data(item_url, game, "spell")
            elif "artifact" in available_item or "relic" in available_item or "oz-kits" in available_item:
                parse_item_data(item_url, game, "accessory")
            elif "class-mod" in available_item or "armor" in available_item:
                parse_item_data(item_url, game, "class-mod")
            elif "rings-amulets" in available_item:
                parse_item_data(item_url, game, "rings-amulets")

def parse_item_data(url, game, item):
    array = []
    og_url = "https://www.lootlemon.com"

    # Web scrapper for infinite scrolling page 
    service = Service(executable_path="chromedriver.exe")
    driver = webdriver.Chrome(service=service)
    driver.get(url)
    time.sleep(2)  # Allow 2 seconds for the web page to open
    scroll_pause_time = 1 # You can set your own pause time. My laptop is a bit slow so I use 1 sec
    screen_height = driver.execute_script("return window.screen.height;")   # get the screen height of the web
    i = 1
    while True:
        # scroll one screen height each time
        driver.execute_script("window.scrollTo(0, {screen_height}*{i});".format(screen_height=screen_height, i=i))  
        i += 1
        time.sleep(scroll_pause_time)
        # update scroll height each time after scrolled, as the scroll height can change after we scrolled the page
        scroll_height = driver.execute_script("return document.body.scrollHeight;")  
        # Break the loop when the height we need to scroll to is larger than the total scroll height
        if (screen_height) * i > scroll_height:
            break
    
    # Good to go
    print("ready")
    content_soup = BeautifulSoup(driver.page_source, "html.parser")
    entries = content_soup.find_all("div", {"role": "listitem", "class":"db_item"}, limit=None)
    for entry in entries:
        # URL to item image
        entry_name = entry.find('img')
        if entry_name is not None:
            print(entry_name['data-name'])
        img = entry.find('img', {"class": "db_cell"})['src']
        # Link to item stats
        href = entry.find('a', href=True)['href']
        item_url = f"{og_url}{href}"
        item_content = download_page(item_url)
        item_content_soup = BeautifulSoup(item_content, "html.parser")
        item_stat_entries = item_content_soup.find("div", {"class":"article_header-card"})
        # Item stats
        flavor_text = item_stat_entries.find("blockquote", {"class":"txt-color-red"}).text.strip()
        item_origin = item_stat_entries.find(id="item-origin")
        item_type = item_stat_entries.find(id="item-type").text.strip()
        item_rarity = item_stat_entries.find(id='item-rarity').text.strip()
        item_manufacturer = item_stat_entries.find(id='item-manufacturer')
        elements = []
        item_elements = item_stat_entries.find_all("img", {"class", "icon-round"})
        for element in item_elements:
            elements.append(element['alt'])
        # Drop Type
        details = entry.find('div', {"class": "db_item-data"})
        details = details.find('img')
        item_name = details['data-name']
        drop_type = details['title']
        # Dedicated Drop Source (if it exists)
        drop_sources = []
        item_drop_sources = entry.find_all("div", {"class": "db_item-source w-dyn-item"})
        for drop_source in item_drop_sources:
            source = drop_source.find("div", {"class": "w-embed"}).text
            source = source.replace("Boss", "").replace("Raid", "").replace("Enemy", "").replace("Named", "").strip()
            drop_sources.append(source)
        
        curr_item = {
            "name": item_name,
            "flavor-text": flavor_text,
            "game": game,
            "type": item_type,
            "rarity": item_rarity,
            "manufacturer": "" if item_manufacturer is None else item_manufacturer.text.strip(),
            "origin": "" if item_origin is None else item_origin.text.strip(),
            "elements": elements,
            "drop-type": drop_type,
            "drop-sources": drop_sources,
            "image": img
        } 
        array.append(curr_item)
    driver.quit()
    with open(f"./{game}-{item}.json", "w") as weapon_list: 
        json.dump(array, weapon_list, indent=4)
    array = []
    og_url = "https://www.lootlemon.com"

    # Web scrapper for infinite scrolling page 
    service = Service(executable_path="chromedriver.exe")
    driver = webdriver.Chrome(service=service)
    driver.get(url)
    time.sleep(2)  # Allow 2 seconds for the web page to open
    scroll_pause_time = 1 # You can set your own pause time. My laptop is a bit slow so I use 1 sec
    screen_height = driver.execute_script("return window.screen.height;")   # get the screen height of the web
    i = 1
    while True:
        # scroll one screen height each time
        driver.execute_script("window.scrollTo(0, {screen_height}*{i});".format(screen_height=screen_height, i=i))  
        i += 1
        time.sleep(scroll_pause_time)
        # update scroll height each time after scrolled, as the scroll height can change after we scrolled the page
        scroll_height = driver.execute_script("return document.body.scrollHeight;")  
        # Break the loop when the height we need to scroll to is larger than the total scroll height
        if (screen_height) * i > scroll_height:
            break
    
    # Good to go
    print("ready")
    content_soup = BeautifulSoup(driver.page_source, "html.parser")
    entries = content_soup.find_all("div", {"role": "listitem", "class":"db_item"}, limit=None)
    for entry in entries:
        # URL to item image
        entry_name = entry.find('img')
        if entry_name is not None:
            print(entry_name['data-name'])
        img = entry.find('img', {"class": "db_cell"})['src']
        # Link to item stats
        href = entry.find('a', href=True)['href']
        item_url = f"{og_url}{href}"
        item_content = download_page(item_url)
        item_content_soup = BeautifulSoup(item_content, "html.parser")
        item_stat_entries = item_content_soup.find("div", {"class":"article_header-card"})
        # Item stats
        flavor_text = item_stat_entries.find("blockquote", {"class":"txt-color-red"}).text.strip()
        item_origin = item_stat_entries.find(id="item-origin").text.strip()
        item_type = item_stat_entries.find(id="item-type").text.strip()
        item_rarity = item_stat_entries.find(id='item-rarity').text.strip()
        item_manufacturer = item_stat_entries.find(id='item-manufacturer').text.strip()
        elements = []
        item_elements = item_stat_entries.find_all("img", {"class", "icon-round"})
        for element in item_elements:
            elements.append(element['alt'])
        # Drop Type
        details = entry.find('div', {"class": "db_item-data"})
        details = details.find('img')
        item_name = details['data-name']
        drop_type = details['title']
        # Dedicated Drop Source (if it exists)
        drop_sources = []
        item_drop_sources = entry.find_all("div", {"class": "db_item-source w-dyn-item"})
        for drop_source in item_drop_sources:
            source = drop_source.find("div", {"class": "w-embed"}).text
            source = source.replace("Boss", "").replace("Raid", "").replace("Enemy", "").replace("Named", "").strip()
            drop_sources.append(source)
        
        curr_item = {
            "name": item_name,
            "flavor-text": flavor_text,
            "game": game,
            "type": item_type,
            "rarity": item_rarity,
            "manufacturer": item_manufacturer,
            "origin": item_origin,
            "elements": elements,
            "drop-type": drop_type,
            "drop-sources": drop_sources,
            "image": img
        } 
        array.append(curr_item)
    driver.quit()
    with open(f"./{game}-weapons.json", "w") as weapon_list: 
        json.dump(array, weapon_list, indent=4)

def main():
    # parse_loot_database()
    parse_named_enemies()

main()