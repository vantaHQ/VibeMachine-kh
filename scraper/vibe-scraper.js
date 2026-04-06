const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeNairobiVibes() {
  // 1. Setup Browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // 2. Curated Nairobi Data Points
  const targets = [
    { name: 'Jiko at Tribe', vibe: 'Signature Series', activity: 'Fine Dining', location: 'Gigiri', basePrice: 8500 },
    { name: 'Thai Chi Sarova', vibe: 'Signature Series', activity: 'Fine Dining', location: 'CBD', basePrice: 7500 },
    { name: 'Tatu Restaurant', vibe: 'Signature Series', activity: 'Fine Dining', location: 'CBD', basePrice: 9000 },
    { name: 'Hero Bar Gigiri', vibe: 'Signature Series', activity: 'Cocktails & Tapas', location: 'Gigiri', basePrice: 5500 },
    { name: 'The Alchemist Westlands', vibe: 'The Hype', activity: 'Nightlife', location: 'Westlands', basePrice: 3500 },
    { name: 'Shamba Cafe Loresho', vibe: 'Soft Life', activity: 'Brunch', location: 'Loresho', basePrice: 4000 },
    { name: 'Roadhouse Grill Karen', vibe: 'Choma & Beers', activity: 'Nightlife', location: 'Karen', basePrice: 2000 },
    { name: 'Cultiva Farm Nairobi', vibe: 'Soft Life', activity: 'Brunch', location: 'Karen', basePrice: 5500 }
  ];

  let results = [];

  for (const target of targets) {
    console.log(`🔍 Processing: ${target.name}...`);
    
    results.push({
      id: Math.random().toString(36).substr(2, 9),
      name: target.name,
      vibe: target.vibe,
      activity: target.activity, // New field for v0 filtering
      location: target.location,
      priceRange: `${target.basePrice.toLocaleString()} - ${(target.basePrice * 2.5).toLocaleString()} KES`,
      minPrice: target.basePrice,
      matchScore: Math.floor(Math.random() * 15) + 85,
      image: `https://images.unsplash.com/photo-${getPhotoId(target.vibe)}?auto=format&fit=crop&w=800&q=80`
    });
  }

  // 3. Setup output paths
  const dataDir = path.join(__dirname, '..', 'data');
  const outputPath = path.join(dataDir, 'spots.json');

  if (!fs.existsSync(dataDir)){
      console.log('📁 Creating data directory...');
      fs.mkdirSync(dataDir, { recursive: true });
  }

  // 4. Save to JSON
  try {
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n✅ Successfully synced ${results.length} spots to: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Failed to write file: ${error.message}`);
    process.exit(1);
  }

  await browser.close();
}

// Updated Helper for the new branding
function getPhotoId(vibe) {
  const photos = {
      'Signature Series': '1559339352-11d03c759d58', // High-end dining aesthetic
      'The Hype': '1470225620780-dba8ba36b745',
      'Choma & Beers': '1555939594-58d7cb561ad1',
      'Soft Life': '1544145945-f904253d0c7b',
      'default': '1517248135467-4c7ed9d4c44b'
  };
  return photos[vibe] || photos['default'];
}

scrapeNairobiVibes();
