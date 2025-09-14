import React from 'react';
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import './OutfitGenerator.css';
import { shirtsData, pantsData } from '../../api/mockData';
import Header from '../../header/Header';

function OutfitGenerator({
  eventType,
  setEventType,
  outfitType,
  setOutfitType,
  selectedShirt,
  setSelectedShirt,
  selectedPants,
  setSelectedPants,
  generated,
  setGenerated,
}) {
  const handleSearch = () => {
    setGenerated(false);
    if (!eventType.trim()) {
      alert("Please enter an event or outfit description.");
      return;
    }
    // Add search logic if needed
  };

  const handleGenerate = () => {
    if (outfitType === 'individual') {
      if (selectedShirt === null) {
        alert("Please select a shirt.");
        return;
      }
      if (selectedPants === null) {
        alert("Please select a pair of pants.");
        return;
      }
    }
    if (outfitType === 'combo') {
      if (selectedShirt === null) {
        alert("Please select a full outfit.");
        return;
      }
    }
    setGenerated(true);
  };

  return (
    <div className="generator-container">
      
      <Header />
      <input
        type="text"
        className="search-input"
        placeholder="Describe your event or outfit..."
        value={eventType}
        onChange={(e) => {
          setEventType(e.target.value);
          setGenerated(false);
        }}
      />

      <div className="outfit-type-toggle">
        <label>
          <input
            type="radio"
            name="outfitType"
            value="individual"
            checked={outfitType === 'individual'}
            onChange={(e) => {
              setOutfitType(e.target.value);
              setGenerated(false);
              setSelectedShirt(null);
              setSelectedPants(null);
            }}
          />
          Individual
        </label>
        <label>
          <input
            type="radio"
            name="outfitType"
            value="combo"
            checked={outfitType === 'combo'}
            onChange={(e) => {
              setOutfitType(e.target.value);
              setGenerated(false);
              setSelectedShirt(null);
              setSelectedPants(null);
            }}
          />
          Combo
        </label>
      </div>

      <button className="search-button" onClick={handleSearch}>Search</button>

      <div className="carousels-section">
        {outfitType === 'individual' && (
          <>
            <ItemCarousel
              title="Shirts"
              items={shirtsData}
              selectedItem={selectedShirt}
              onSelectItem={(idx) => {
                setSelectedShirt(idx);
                setGenerated(false);
              }}
            />
            <ItemCarousel
              title="Pants"
              items={pantsData}
              selectedItem={selectedPants}
              onSelectItem={(idx) => {
                setSelectedPants(idx);
                setGenerated(false);
              }}
            />
          </>
        )}

        {outfitType === 'combo' && (
          <ItemCarousel
            title="Full Outfits"
            items={shirtsData} // Replace with your full outfit images array if available
            selectedItem={selectedShirt}
            onSelectItem={(idx) => {
              setSelectedShirt(idx);
              setGenerated(false);
            }}
          />
        )}
      </div>

      <button className="generate-button" onClick={handleGenerate}>Generate</button>
    </div>
  );
}

export default OutfitGenerator;