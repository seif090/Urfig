import mongoose from 'mongoose';
import { LegoPart, LegoPartType } from './models/LegoPart.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/urfig';

const seedParts = [
  // HEADS
  { name: 'Classic Smile', type: LegoPartType.HEAD, price: 1.50, imageUrl: 'assets/parts/heads/classic-smile.png', stock: 50 },
  { name: 'Winking Face', type: LegoPartType.HEAD, price: 1.75, imageUrl: 'assets/parts/heads/wink.png', stock: 30 },
  { name: 'Cool Shades', type: LegoPartType.HEAD, price: 2.00, imageUrl: 'assets/parts/heads/shades.png', stock: 25 },
  
  // TORSOS
  { name: 'Red Hoodie', type: LegoPartType.TORSO, price: 3.00, imageUrl: 'assets/parts/torsos/red-hoodie.png', stock: 40 },
  { name: 'Space Suit', type: LegoPartType.TORSO, price: 4.50, imageUrl: 'assets/parts/torsos/space-suit.png', stock: 15 },
  { name: 'Business Suit', type: LegoPartType.TORSO, price: 3.50, imageUrl: 'assets/parts/torsos/suit.png', stock: 20 },

  // LEGS
  { name: 'Blue Jeans', type: LegoPartType.LEGS, price: 2.00, imageUrl: 'assets/parts/legs/blue-jeans.png', stock: 50 },
  { name: 'Black Slacks', type: LegoPartType.LEGS, price: 2.00, imageUrl: 'assets/parts/legs/black-slacks.png', stock: 40 },
  { name: 'Robot Legs', type: LegoPartType.LEGS, price: 3.50, imageUrl: 'assets/parts/legs/robot-legs.png', stock: 10 },

  // ACCESSORIES
  { name: 'Red Cape', type: LegoPartType.ACCESSORY, price: 1.25, imageUrl: 'assets/parts/acc/red-cape.png', stock: 20 },
  { name: 'Lightsaber', type: LegoPartType.ACCESSORY, price: 2.50, imageUrl: 'assets/parts/acc/lightsaber.png', stock: 15 },
  { name: 'Coffee Cup', type: LegoPartType.ACCESSORY, price: 0.75, imageUrl: 'assets/parts/acc/coffee.png', stock: 100 }
];

const seedProducts = [
  { name: 'Spider-Man Keychain', description: 'Hero of New York', category: 'Marvel', price: 9.99, imageUrl: 'assets/products/spiderman.png', stock: 10, isReadyMade: true },
  { name: 'Darth Vader Keychain', description: 'Dark Lord of the Sith', category: 'Star Wars', price: 12.50, imageUrl: 'assets/products/vader.png', stock: 5, isReadyMade: true },
  { name: 'Classic Astronaut', description: 'Retro Space explorer', category: 'Space', price: 7.99, imageUrl: 'assets/products/astro.png', stock: 20, isReadyMade: true }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await LegoPart.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Insert
    await LegoPart.insertMany(seedParts);
    await Product.insertMany(seedProducts);
    console.log('Successfully seeded database!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
