// src/components/FoodItemCard.js
import React from 'react';

const FoodItemCard = ({ food, onOrder }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', width: '250px' }}>
      {food.image && (
        <img src={food.image} alt={food.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      )}
      <h3>{food.name}</h3>
      <p>{food.description}</p>
      <p>${food.price}</p>
      <button onClick={() => onOrder(food)}>Order</button>
    </div>
  );
};

export default FoodItemCard;
