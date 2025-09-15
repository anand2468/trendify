import React, { useState } from 'react';
import ItemCarousel from '../ItemCarousel/ItemCarousel';
import './OutfitGenerator.css';
// import { shirtsData, pantsData } from '../../api/mockData';
import Header from '../../header/Header';
import data from '../../api/mockData';

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
  userImage,
  setUserImage
}) {
  const [shirtsData, setShirtsData] = useState([])
  const [pantsData, setPantsData] = useState([])

  const handleSearch = () => {
    setGenerated(false);
    if (!eventType.trim()) {
      alert("Please enter an event or outfit description.");
      return;
    }
    setShirtsData([]);
    setPantsData([]);
  // Call backend API to get products based on eventType and outfitType
  fetch(`http://localhost:5000/getproducts?product=${encodeURIComponent(eventType)}&outfittype=${encodeURIComponent(outfitType)}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    })
    .then(data => {
      console.log(data)
      if (outfitType === 'individual') {
        // Expecting data.shirts and data.pants as arrays of {name, image, url}
        if ( true) {
          // Overwrite shirtsData and pantsData arrays
          setShirtsData(data.shirts)
          console.log(data)
          setPantsData(data.pants)
        }
      }
      else{
        if ( data.shirts.length != 0){
          setShirtsData(data.shirts)
        }
      }
      // You can handle 'combo' or other types here if needed
    })
    .catch(err => {
      alert("Error fetching products: " + err.message);
    });
      // setShirtsData(data.shirts);
      // setPantsData(data.pants);
  };

  const handleGenerate = () => {
      if (selectedShirt === null && selectedPants === null) {
        alert("Please select an outfit.");
        return;
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
        {shirtsData && shirtsData.length!=0 && (
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
            {/* <ItemCarousel
              title="Pants"
              items={shirtsData}
              selectedItem={selectedPants}
              onSelectItem={(idx) => {
                setSelectedPants(idx);
                setGenerated(false);
              }}
            /> */}
          </>
        )}

        { pantsData && pantsData.length !=0 && (
          <ItemCarousel
            title="Full Outfits"
            items={pantsData} // Replace with your full outfit images array if available
            selectedItem={selectedPants}
            onSelectItem={(idx) => {
              selectedPants(idx);
              setGenerated(false);
            }}
          />
        )}
      </div>

      { (selectedShirt != null || selectedPants != null) && 
      <>
        <h4>upload your image</h4>
        <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = ev => setUserImage(ev.target.result);
                reader.readAsDataURL(file);
              }
            }}
            style={{ marginBottom: 16 }}
          />
          {userImage && (
            <div style={{ marginBottom: 16 }}>
              <img
                src={userImage}
                alt="User"
                style={{
                  width: 150,
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: '5%',
                  border: '3px solid #2563eb',
                  boxShadow: '0 2px 8px rgba(52, 152, 219, 0.13)'
                }}
              />
            </div>
          )}
        

        <button className="generate-button" onClick={handleGenerate}>Generate</button>
      </> }
    </div>
  );
}

export default OutfitGenerator;