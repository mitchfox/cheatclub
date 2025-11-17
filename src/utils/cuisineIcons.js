// Get appropriate food icon based on cuisine types
export const getCuisineIcon = (cuisines = []) => {
  const cuisineLower = cuisines.map(c => c.toLowerCase());
  
  // Indian/Curry
  if (cuisineLower.some(c => c.includes('indian') || c.includes('curry'))) {
    return (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#EA580C" opacity="0.3"/>
        <circle cx="12" cy="12" r="6" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.6"/>
        <path d="M12 8c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z" fill="#EA580C" opacity="0.7"/>
        <circle cx="10" cy="10" r="1" fill="#EA580C"/>
        <circle cx="14" cy="10" r="1" fill="#EA580C"/>
        <circle cx="12" cy="13" r="1" fill="#EA580C"/>
      </svg>
    );
  }
  
  // Asian (Chinese, Japanese, Korean, Thai, etc.)
  if (cuisineLower.some(c => 
    c.includes('asian') || 
    c.includes('chinese') || 
    c.includes('japanese') || 
    c.includes('korean') || 
    c.includes('thai') ||
    c.includes('dim sum') ||
    c.includes('dumplings') ||
    c.includes('southeast asian')
  )) {
    return (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#EA580C" opacity="0.3"/>
        <circle cx="12" cy="12" r="6" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.6"/>
        <path d="M8 10h8M8 12h8M8 14h8" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
        <path d="M6 8l2-2M18 8l-2-2" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <path d="M7 16l1-1M17 16l-1-1" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    );
  }
  
  // Rice/Bowls
  if (cuisineLower.some(c => 
    c.includes('rice') || 
    c.includes('bowl') ||
    c.includes('poke')
  )) {
    return (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#EA580C" opacity="0.3"/>
        <path d="M8 14c0-2 1.5-4 4-4s4 2 4 4" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.6"/>
        <circle cx="10" cy="13" r="1" fill="#EA580C" opacity="0.7"/>
        <circle cx="12" cy="14" r="1" fill="#EA580C" opacity="0.7"/>
        <circle cx="14" cy="13" r="1" fill="#EA580C" opacity="0.7"/>
        <circle cx="11" cy="15" r="0.8" fill="#EA580C" opacity="0.6"/>
        <circle cx="13" cy="15" r="0.8" fill="#EA580C" opacity="0.6"/>
      </svg>
    );
  }
  
  // Breakfast
  if (cuisineLower.some(c => c.includes('breakfast'))) {
    return (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#EA580C" opacity="0.3"/>
        <circle cx="12" cy="12" r="6" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.6"/>
        <circle cx="12" cy="10" r="3" fill="#EA580C" opacity="0.5"/>
        <path d="M9 13h6" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <path d="M10 15h4" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    );
  }
  
  // Seafood
  if (cuisineLower.some(c => c.includes('seafood'))) {
    return (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#EA580C" opacity="0.3"/>
        <circle cx="12" cy="12" r="6" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.6"/>
        <path d="M10 10c0-1 1-2 2-2s2 1 2 2" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.7"/>
        <path d="M8 12c2 2 4 2 8 0" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <circle cx="10" cy="11" r="0.8" fill="#EA580C" opacity="0.6"/>
        <circle cx="14" cy="11" r="0.8" fill="#EA580C" opacity="0.6"/>
      </svg>
    );
  }
  
  // Vegetarian/Vegan
  if (cuisineLower.some(c => c.includes('vegetarian') || c.includes('vegan'))) {
    return (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#EA580C" opacity="0.3"/>
        <circle cx="12" cy="12" r="6" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.6"/>
        <path d="M10 10h4M10 12h4M10 14h4" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
        <circle cx="9" cy="11" r="0.8" fill="#EA580C" opacity="0.6"/>
        <circle cx="15" cy="11" r="0.8" fill="#EA580C" opacity="0.6"/>
        <circle cx="9" cy="13" r="0.8" fill="#EA580C" opacity="0.6"/>
        <circle cx="15" cy="13" r="0.8" fill="#EA580C" opacity="0.6"/>
      </svg>
    );
  }
  
  // Fried Chicken
  if (cuisineLower.some(c => c.includes('fried chicken') || c.includes('chicken'))) {
    return (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="#EA580C" opacity="0.3"/>
        <circle cx="12" cy="12" r="6" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.6"/>
        <path d="M10 10c1-1 2-1 4 0" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <path d="M9 13c1 1 2 1 6 0" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <circle cx="11" cy="11" r="1" fill="#EA580C" opacity="0.6"/>
        <circle cx="13" cy="11" r="1" fill="#EA580C" opacity="0.6"/>
      </svg>
    );
  }
  
  // Default (plate with food)
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="#EA580C" opacity="0.3"/>
      <circle cx="12" cy="12" r="6" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M8 10h8M8 12h8M8 14h8" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <path d="M6 8l2-2M18 8l-2-2" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
};

