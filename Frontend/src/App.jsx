import './App.css'
import React, { useState } from 'react'
import OutfitGenerator from './components/OutfitGenerator/OutfitGenerator'
import { shirtsData, pantsData } from './api/mockData'
import Header from './header/Header'
function App() {
  const [eventType, setEventType] = useState('');
  const [outfitType, setOutfitType] = useState('fullOutfit');
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [selectedPants, setSelectedPants] = useState(null);
  const [generated, setGenerated] = useState(false);
  const [userImage, setUserImage] = useState(null);

  return (
    <>
    
    <div className="main-layout">
      <div className="left-panel">
        <OutfitGenerator
          eventType={eventType}
          setEventType={setEventType}
          outfitType={outfitType}
          setOutfitType={setOutfitType}
          selectedShirt={selectedShirt}
          setSelectedShirt={setSelectedShirt}
          selectedPants={selectedPants}
          setSelectedPants={setSelectedPants}
          generated={generated}
          setGenerated={setGenerated}
        />
      </div>
      <div className="right-panel">
        <div className="output-preview">
          <h2>Your Outfit Preview</h2>
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
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '3px solid #2563eb',
                  boxShadow: '0 2px 8px rgba(52, 152, 219, 0.13)'
                }}
              />
            </div>
          )}
          {generated ? (
            <>
              <div>
                <b>Event:</b> {eventType}
              </div>
              {selectedShirt !== null && (
                <div>
                  <img src={shirtsData[selectedShirt]} alt="Shirt" style={{ width: 100, borderRadius: 12 }} />
                  <div>Shirt {selectedShirt + 1}</div>
                </div>
              )}
              {selectedPants !== null && (
                <div>
                  <img src={pantsData[selectedPants]} alt="Pants" style={{ width: 100, borderRadius: 12 }} />
                  <div>Pants {selectedPants + 1}</div>
                </div>
              )}
              <div style={{ marginTop: 8, fontSize: 16 }}>🎉 Your outfit is ready!</div>
            </>
          ) : (
            <div style={{ color: '#888' }}>Select items and click Generate to see your outfit here.</div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
