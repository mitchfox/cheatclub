// Map cuisine names to relevant food emojis
export const getCuisineEmoji = (cuisine) => {
  if (!cuisine) return '🍽️';
  
  const cuisineLower = cuisine.toLowerCase();
  
  // Indian/Curry
  if (cuisineLower.includes('indian') || cuisineLower.includes('curry')) {
    return '🍛';
  }
  
  // Chinese
  if (cuisineLower.includes('chinese') || cuisineLower.includes('dim sum') || cuisineLower.includes('dumplings')) {
    return '🥟';
  }
  
  // Japanese
  if (cuisineLower.includes('japanese') || cuisineLower.includes('sushi') || cuisineLower.includes('ramen')) {
    return '🍣';
  }
  
  // Korean
  if (cuisineLower.includes('korean') || cuisineLower.includes('bbq')) {
    return '🥘';
  }
  
  // Thai
  if (cuisineLower.includes('thai')) {
    return '🍜';
  }
  
  // Asian (general)
  if (cuisineLower.includes('asian') || cuisineLower.includes('southeast asian')) {
    return '🍱';
  }
  
  // Rice/Bowls/Poke
  if (cuisineLower.includes('rice') || cuisineLower.includes('bowl') || cuisineLower.includes('poke')) {
    return '🍚';
  }
  
  // Pizza
  if (cuisineLower.includes('pizza') || cuisineLower.includes('italian')) {
    return '🍕';
  }
  
  // Burger
  if (cuisineLower.includes('burger') || cuisineLower.includes('burgers')) {
    return '🍔';
  }
  
  // Fried Chicken
  if (cuisineLower.includes('fried chicken') || cuisineLower.includes('chicken')) {
    return '🍗';
  }
  
  // Mexican
  if (cuisineLower.includes('mexican') || cuisineLower.includes('taco') || cuisineLower.includes('burrito')) {
    return '🌮';
  }
  
  // Seafood
  if (cuisineLower.includes('seafood') || cuisineLower.includes('fish')) {
    return '🐟';
  }
  
  // Breakfast
  if (cuisineLower.includes('breakfast') || cuisineLower.includes('brunch')) {
    return '🥞';
  }
  
  // Vegetarian/Vegan
  if (cuisineLower.includes('vegetarian') || cuisineLower.includes('vegan')) {
    return '🥗';
  }
  
  // Dessert/Sweets
  if (cuisineLower.includes('dessert') || cuisineLower.includes('sweet') || cuisineLower.includes('ice cream')) {
    return '🍰';
  }
  
  // Coffee/Cafe
  if (cuisineLower.includes('coffee') || cuisineLower.includes('cafe') || cuisineLower.includes('café')) {
    return '☕';
  }
  
  // Mediterranean
  if (cuisineLower.includes('mediterranean') || cuisineLower.includes('greek') || cuisineLower.includes('middle eastern')) {
    return '🥙';
  }
  
  // Vietnamese
  if (cuisineLower.includes('vietnamese') || cuisineLower.includes('pho')) {
    return '🍲';
  }
  
  // French
  if (cuisineLower.includes('french')) {
    return '🥐';
  }
  
  // Steak
  if (cuisineLower.includes('steak') || cuisineLower.includes('bbq') || cuisineLower.includes('grill')) {
    return '🥩';
  }
  
  // Noodles
  if (cuisineLower.includes('noodles') || cuisineLower.includes('pasta')) {
    return '🍝';
  }
  
  // Sandwich
  if (cuisineLower.includes('sandwich') || cuisineLower.includes('sub')) {
    return '🥪';
  }
  
  // Default
  return '🍽️';
};

