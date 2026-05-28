import sqlite3
import json

cars = [
    {
        "name": "BMW X5 2024",
        "price": "6,850,000 EGP",
        "image": "https://media.ed.edmunds-media.com/bmw/x5/2024/oem/2024_bmw_x5_4dr-suv_xdrive40i_fq_oem_1_815.jpg",
        "year": 2024,
        "km": "10,000",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "fuelType": "Petrol",
        "color": "Blue",
        "condition": "Excellent",
        "phone": "+201012345678"
    },
    {
        "name": "Mercedes C200",
        "price": "3,900,000 EGP",
        "image": "https://legion-images.hatla2ee.com/original_image/3497b43a-1a5c-475b-a8b5-821b7f71e9b2/large.jpg",
        "year": 2023,
        "km": "20,000",
        "transmission": "Automatic",
        "bodyType": "Sedan",
        "fuelType": "Petrol",
        "color": "Silver",
        "condition": "Excellent",
        "phone": "+201098765432"
    },
    {
        "name": "Kia Sportage",
        "price": "1,850,000 EGP",
        "image": "https://cdn.motor1.com/images/mgl/133GM/s1/2022-kia-sportage.jpg",
        "year": 2022,
        "km": "40,000",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "fuelType": "Petrol",
        "color": "Dark blue",
        "condition": "Good",
        "phone": "+201011122233"
    },
    {
        "name": "Audi RS7",
        "price": "12,200,000 EGP",
        "image": "https://platform.cstatic-images.com/in/v2/stock_photos/72330740-8105-498b-987c-46354017d84c/c6452ec9-9a91-4b72-b6c9-63858634519f.png",
        "year": 2024,
        "km": "5,000",
        "transmission": "Automatic",
        "bodyType": "Coupe",
        "fuelType": "Petrol",
        "color": "white",
        "condition": "Excellent",
        "phone": "+201055566677"
    },
    {
        "name": "Toyota Corolla",
        "price": "1,300,000 EGP",
        "image": "https://hips.hearstapps.com/mtg-prod/65a4c115adb8a40008364496/015-2023-toyota-corolla-hybrid-in-action.jpg",
        "year": 2023,
        "km": "15,000",
        "transmission": "Automatic",
        "bodyType": "Sedan",
        "fuelType": "Petrol",
        "color": "Magnetic gray",
        "condition": "Excellent",
        "phone": "+201022233344"
    },
    {
        "name": "Hyundai Elantra",
        "price": "1,250,000 EGP",
        "image": "https://cdn.motor1.com/images/mgl/GxoB1/s1/2022-hyundai-elantra-n.jpg",
        "year": 2022,
        "km": "35,000",
        "transmission": "Automatic",
        "bodyType": "Sedan",
        "fuelType": "Petrol",
        "color": "White",
        "condition": "Good",
        "phone": "+201077788899"
    },
    {
        "name": "Porsche Cayenne",
        "price": "12,500,000 EGP",
        "image": "https://cdn.motor1.com/images/mgl/bgm3W6/s3/2024-porsche-cayenne-turbo-e-hybrid-front-3-4.jpg",
        "year": 2024,
        "km": "2,000",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "fuelType": "Hybrid",
        "color": "White",
        "condition": "Excellent",
        "phone": "+201066677788"
    },
    {
        "name": "Range Rover Sport",
        "price": "13,500,000 EGP",
        "image": "https://media.ed.edmunds-media.com/land-rover/range-rover-sport/2024/oem/2024_land-rover_range-rover-sport_4dr-suv_p550e-autobiography_fq_oem_1_1600.jpg",
        "year": 2024,
        "km": "1,000",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "fuelType": "Hybrid",
        "color": "Red",
        "condition": "Excellent",
        "phone": "+201044455566"
    },
    {
        "name": "Nissan Sunny",
        "price": "690,000 EGP",
        "image": "https://autobazaardubai.com/wp-content/uploads/2024/08/Sunny-2021-5-1200x750.jpeg",
        "year": 2021,
        "km": "55,000",
        "transmission": "Automatic",
        "bodyType": "Sedan",
        "fuelType": "Petrol",
        "color": "Black",
        "condition": "Fair",
        "phone": "+201099988877"
    },
    {
        "name": "Chevrolet Captiva",
        "price": "1,450,000 EGP",
        "image": "https://www.carsooq.com/storage/uploads/247815/conversions/2023-chevrolet-captiva-premier-with-warranty-1-5l-150-hp-7-seater-5-door-automatic-petrol-front-wheel-drive-7-seats-5-doors-1754155214-large.webp",
        "year": 2023,
        "km": "18,000",
        "transmission": "Automatic",
        "bodyType": "SUV",
        "fuelType": "Petrol",
        "color": "Brown",
        "condition": "Excellent",
        "phone": "+201033344455"
    },
    {
        "name": "Tesla Model S",
        "price": "6,500,000 EGP",
        "image": "https://img.autobytel.com/chrome/colormatched_01/white/1280/cc_2024tsc02_01_1280/cc_2024tsc021982876_01_1280_pn01.jpg",
        "year": 2024,
        "km": "3,000",
        "transmission": "Automatic",
        "bodyType": "Sedan",
        "fuelType": "Electric",
        "color": "Black",
        "condition": "Excellent",
        "phone": "+201088899900"
    },
    {
        "name": "Volkswagen Golf GTI",
        "price": "2,300,000 EGP",
        "image": "https://di-uploads-pod40.dealerinspire.com/southernteamvolkswagen/uploads/2022/05/ogi1-2022-vw-golf-gti-long-term-001.jpg",
        "year": 2022,
        "km": "25,000",
        "transmission": "Automatic",
        "bodyType": "Hatchback",
        "fuelType": "Petrol",
        "color": "Grey",
        "condition": "Good",
        "phone": "+201011199988"
    }
]

conn = sqlite3.connect('cars_database.db')
cursor = conn.cursor()

for car in cars:
    parts = car['name'].split(' ', 1)
    brand = parts[0]
    model_name = parts[1] if len(parts) > 1 else ""
    asking_price = int(car['price'].replace(" EGP", "").replace(",", ""))
    mileage = float(car['km'].replace(",", ""))
    
    cursor.execute('''
    INSERT INTO cars_for_sale (brand, model_name, color, registration_year, power_ps, fuel_type, transmission_type, fuel_consumption, mileage, condition, body_type, description, phone, image_path, asking_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        brand, model_name, car['color'], car['year'], 150.0, car['fuelType'], 
        car['transmission'], 8.0, mileage, car['condition'], car['bodyType'], 
        "Imported from static data", car['phone'], car['image'], asking_price
    ))

conn.commit()
conn.close()
print(f"Imported {len(cars)} cars successfully!")
