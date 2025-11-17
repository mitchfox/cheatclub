import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleRestaurantsLoaded = useCallback((data) => {
    setRestaurants(data);
    setFilteredRestaurants(data);
  }, []);

  const handleFilterChange = useCallback((filtered) => {
    setFilteredRestaurants(filtered);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          restaurants={restaurants} 
          onFilterChange={handleFilterChange}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <RestaurantList 
                onRestaurantsLoaded={handleRestaurantsLoaded}
                filteredRestaurants={filteredRestaurants}
                setFilteredRestaurants={setFilteredRestaurants}
              />
            } 
          />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

