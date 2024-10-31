// src/FocusComponent.js

import React from 'react';
import './HomeComponent.css';

const FocusComponent = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: '138px' }}>
      <div style={{ width: 1440, padding: 32, background: '#E2EAF1', borderBottom: '1px #D9D9D9 solid', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 24 }}>
        <div style={{ flex: '1 1 0', height: 32, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ padding: 8, borderRadius: 8 }} />
        </div>
      </div>
      <img style={{ width: 129, height: 96 }} src="https://via.placeholder.com/129x96" alt="Placeholder" />
      <div style={{ width: 1505, height: 543, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 1505, height: 543, position: 'relative' }}>
          <div style={{ width: 1032, left: 237, top: 36, position: 'absolute', textAlign: 'center', fontSize: 250, fontFamily: 'Poppins', fontWeight: 400, letterSpacing: 50 }}>FOCUS</div>
          <div style={{ width: 1505, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#093966', fontSize: 64, fontFamily: 'Poppins', fontWeight: 400, letterSpacing: 12.8 }}>welcome to the evolution of</div>
          <div style={{ width: 870, height: 52, left: 326, top: 375, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 32, fontFamily: 'Poppins', fontWeight: 400, letterSpacing: 6.4 }}>in a world of frenzy, let’s find our focus</div>
        </div>
      </div>
      <div style={{ width: 1440, height: 110, padding: '32px 32px 160px 32px', background: '#8AAEC6', borderTop: '1px #D9D9D9 solid' }} />
      <div style={{ color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: 400, textDecoration: 'underline', lineHeight: '22.4px' }}>About</div>
      <div style={{ color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: 400, textDecoration: 'underline', lineHeight: '22.4px' }}>Privacy Policy</div>
    </div>
  );
};

export default FocusComponent;