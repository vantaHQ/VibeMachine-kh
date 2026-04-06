import json
import random
import os

# Manual Seed Data to get you moving immediately
def run_fast_seed():
    print("🚀 Generating Nairobi Vibe Data (Zero-Dependency Mode)...")
    
    base_data = [
        {"name": "Sankara Sarabi Rooftop", "loc": "Westlands", "vibe": "Signature Series", "price": "15,000 - 30,000"},
        {"name": "Cultiva Farm Kenya", "loc": "Karen", "vibe": "Soft Life", "price": "4,500 - 8,000"},
        {"name": "Inti Nairobi", "loc": "Westlands", "vibe": "Signature Series", "price": "12,000 - 25,000"},
        {"name": "The Alchemist Bar", "loc": "Westlands", "vibe": "The Hype", "price": "2,500 - 7,000"},
        {"name": "Hero Bar & Tapas", "loc": "Gigiri", "vibe": "Cocktails & Tapas", "price": "6,000 - 12,000"},
        {"name": "Connect Coffee", "loc": "Riverside", "vibe": "Work Remote", "price": "1,500 - 3,500"},
        {"name": "Roadhouse Grill", "loc": "Karen", "vibe": "Choma & Beers", "price": "2,000 - 5,000"},
        {"name": "About Thyme", "loc": "Westlands", "vibe": "Soft Life", "price": "5,000 - 10,000"},
        {"name": "GTC Rooftop Lounge", "loc": "Westlands", "vibe": "Signature Series", "price": "20,000 - 45,000"},
        {"name": "Brew Bistro", "loc": "Ngong Road", "vibe": "Sundowners", "price": "3,000 - 9,000"}
    ]

    final_spots = []
    for i, item in enumerate(base_data):
        min_p = int(item['price'].split(' - ')[0].replace(',', ''))
        
        spot = {
            "id": f"vibe-spot-{i}",
            "name": item['name'],
            "vibe": item['vibe'],
            "location": item['loc'],
            "priceRange": f"{item['price']} KES",
            "minPrice": min_p,
            "matchScore": random.randint(88, 99),
            "image": f"https://images.unsplash.com/photo-{1517248135467 + i}?q=80&w=800"
        }
        final_spots.append(spot)

    # Ensure the data directory exists
    os.makedirs('data', exist_ok=True)
    
    # Save directly into your data folder
    with open('data/spots.json', 'w') as f:
        json.dump(final_spots, f, indent=2)
    
    print(f"✅ Success! Generated {len(final_spots)} spots in data/spots.json")

if __name__ == "__main__":
    run_fast_seed()