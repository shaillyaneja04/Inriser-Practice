export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
  priceRange: string;
  featured: boolean;
  description: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  vegetarian: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: '1', name: 'All', icon: 'grid' },
  { id: '2', name: 'Pizza', icon: 'pizza-outline' },
  { id: '3', name: 'Burger', icon: 'fast-food-outline' },
  { id: '4', name: 'Sushi', icon: 'fish-outline' },
  { id: '5', name: 'Indian', icon: 'flame-outline' },
  { id: '6', name: 'Chinese', icon: 'restaurant-outline' },
  { id: '7', name: 'Dessert', icon: 'ice-cream-outline' },
  { id: '8', name: 'Drinks', icon: 'cafe-outline' },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Italian Kitchen',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    cuisine: 'Italian',
    rating: 4.7,
    reviewCount: 324,
    deliveryTime: '25-35 min',
    deliveryFee: 'Free',
    distance: '1.2 km',
    priceRange: '$$',
    featured: true,
    description: 'Authentic Italian cuisine with handmade pasta and wood-fired pizzas. Our chef brings 20 years of experience from Naples.',
  },
  {
    id: '2',
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    cuisine: 'American',
    rating: 4.5,
    reviewCount: 512,
    deliveryTime: '15-25 min',
    deliveryFee: '\$2.99',
    distance: '0.8 km',
    priceRange: '$',
    featured: true,
    description: 'Juicy burgers made with premium Angus beef. Voted best burger joint in the city for 3 years running.',
  },
  {
    id: '3',
    name: 'Sakura Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    cuisine: 'Japanese',
    rating: 4.8,
    reviewCount: 287,
    deliveryTime: '30-40 min',
    deliveryFee: '\$3.99',
    distance: '2.1 km',
    priceRange: '$$$',
    featured: true,
    description: 'Premium sushi and sashimi prepared by our master chef. Fresh fish delivered daily from the Tsukiji market.',
  },
  {
    id: '4',
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    cuisine: 'Indian',
    rating: 4.6,
    reviewCount: 198,
    deliveryTime: '30-45 min',
    deliveryFee: '\$1.99',
    distance: '1.5 km',
    priceRange: '$$',
    featured: false,
    description: 'Experience the rich flavors of India with our authentic curries, biryanis, and tandoori specialties.',
  },
  {
    id: '5',
    name: 'Dragon Wok',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
    cuisine: 'Chinese',
    rating: 4.3,
    reviewCount: 156,
    deliveryTime: '20-30 min',
    deliveryFee: '\$2.49',
    distance: '1.0 km',
    priceRange: '$',
    featured: false,
    description: 'Traditional Chinese stir-fry and dim sum. Family recipes passed down through four generations.',
  },
  {
    id: '6',
    name: 'Sweet Treats Bakery',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800',
    cuisine: 'Dessert',
    rating: 4.9,
    reviewCount: 421,
    deliveryTime: '20-30 min',
    deliveryFee: '\$1.49',
    distance: '0.5 km',
    priceRange: '$$',
    featured: true,
    description: 'Artisanal cakes, pastries, and desserts baked fresh daily. Perfect for satisfying your sweet tooth.',
  },
];

export const menuItems: MenuItem[] = [
  // Italian Kitchen
  { id: '101', restaurantId: '1', name: 'Margherita Pizza', description: 'Classic tomato sauce, fresh mozzarella, basil on a thin crispy crust', price: 14.99, image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800', category: 'Pizza', popular: true, vegetarian: true },
  { id: '102', restaurantId: '1', name: 'Fettuccine Alfredo', description: 'Creamy parmesan sauce with freshly made fettuccine pasta', price: 16.99, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800', category: 'Pasta', popular: true, vegetarian: true },
  { id: '103', restaurantId: '1', name: 'Chicken Parmigiana', description: 'Breaded chicken cutlet with marinara and melted mozzarella', price: 18.99, image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800', category: 'Main', popular: false, vegetarian: false },
  { id: '104', restaurantId: '1', name: 'Tiramisu', description: 'Classic Italian dessert with mascarpone, espresso, and cocoa', price: 8.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800', category: 'Dessert', popular: true, vegetarian: true },
  { id: '105', restaurantId: '1', name: 'Caesar Salad', description: 'Crisp romaine, parmesan, croutons with house Caesar dressing', price: 10.99, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800', category: 'Salad', popular: false, vegetarian: true },

  // Burger Palace
  { id: '201', restaurantId: '2', name: 'Classic Smash Burger', description: 'Double smashed patty, American cheese, pickles, special sauce', price: 12.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', category: 'Burger', popular: true, vegetarian: false },
  { id: '202', restaurantId: '2', name: 'BBQ Bacon Burger', description: 'Angus beef, crispy bacon, cheddar, onion rings, BBQ sauce', price: 15.99, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800', category: 'Burger', popular: true, vegetarian: false },
  { id: '203', restaurantId: '2', name: 'Loaded Fries', description: 'Crispy fries topped with cheese sauce, bacon bits, and chives', price: 8.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800', category: 'Sides', popular: false, vegetarian: false },
  { id: '204', restaurantId: '2', name: 'Milkshake', description: 'Thick and creamy milkshake — choose from vanilla, chocolate, or strawberry', price: 6.99, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800', category: 'Drinks', popular: true, vegetarian: true },

  // Sakura Sushi
  { id: '301', restaurantId: '3', name: 'Salmon Nigiri (6 pcs)', description: 'Fresh Atlantic salmon over seasoned sushi rice', price: 16.99, image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800', category: 'Nigiri', popular: true, vegetarian: false },
  { id: '302', restaurantId: '3', name: 'Dragon Roll', description: 'Shrimp tempura, avocado, eel, and spicy mayo', price: 18.99, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800', category: 'Rolls', popular: true, vegetarian: false },
  { id: '303', restaurantId: '3', name: 'Miso Soup', description: 'Traditional miso broth with tofu, wakame seaweed, and scallions', price: 4.99, image: 'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=800', category: 'Soup', popular: false, vegetarian: true },
  { id: '304', restaurantId: '3', name: 'Edamame', description: 'Steamed soy beans lightly salted — a perfect starter', price: 5.99, image: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800', category: 'Appetizer', popular: false, vegetarian: true },

  // Spice Garden
  { id: '401', restaurantId: '4', name: 'Butter Chicken', description: 'Tender chicken in a rich, creamy tomato-butter sauce', price: 15.99, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800', category: 'Main', popular: true, vegetarian: false },
  { id: '402', restaurantId: '4', name: 'Paneer Tikka Masala', description: 'Grilled cottage cheese cubes in a spiced tomato gravy', price: 14.99, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800', category: 'Main', popular: true, vegetarian: true },
  { id: '403', restaurantId: '4', name: 'Garlic Naan', description: 'Soft, fluffy bread brushed with garlic butter', price: 3.99, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800', category: 'Bread', popular: false, vegetarian: true },
  { id: '404', restaurantId: '4', name: 'Chicken Biryani', description: 'Fragrant basmati rice cooked with spiced chicken and saffron', price: 17.99, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800', category: 'Rice', popular: true, vegetarian: false },

  // Dragon Wok
  { id: '501', restaurantId: '5', name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts, vegetables, and chili peppers', price: 13.99, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800', category: 'Main', popular: true, vegetarian: false },
  { id: '502', restaurantId: '5', name: 'Dim Sum Platter', description: 'Assorted steamed dumplings with dipping sauces', price: 12.99, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', category: 'Appetizer', popular: true, vegetarian: false },
  { id: '503', restaurantId: '5', name: 'Fried Rice', description: 'Wok-fried rice with egg, vegetables, and soy sauce', price: 10.99, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800', category: 'Rice', popular: false, vegetarian: true },

  // Sweet Treats
  { id: '601', restaurantId: '6', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream', price: 9.99, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800', category: 'Cake', popular: true, vegetarian: true },
  { id: '602', restaurantId: '6', name: 'Crème Brûlée', description: 'Classic French custard with a caramelized sugar top', price: 8.99, image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800', category: 'Dessert', popular: true, vegetarian: true },
  { id: '603', restaurantId: '6', name: 'Cheesecake Slice', description: 'New York style cheesecake with berry compote', price: 7.99, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800', category: 'Cake', popular: false, vegetarian: true },
  { id: '604', restaurantId: '6', name: 'Macarons (6 pcs)', description: 'Assorted French macarons in seasonal flavors', price: 11.99, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800', category: 'Pastry', popular: true, vegetarian: true },
];
