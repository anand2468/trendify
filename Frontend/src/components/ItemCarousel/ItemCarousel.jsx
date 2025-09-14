import React from 'react';
import './ItemCarousel.css';

function ItemCarousel({ title, items, selectedItem, onSelectItem }) {
  return (
    <div className="carousel-wrapper">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-background">
        <div className="carousel-container">
          {items.map((itemUrl, index) => (
            <div
              key={index}
              className={`carousel-item ${selectedItem === index ? 'selected' : ''}`}
              onClick={() => onSelectItem(index)}
            >
              <img src={itemUrl} alt={`${title} item ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemCarousel;