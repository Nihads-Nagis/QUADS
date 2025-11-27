// src/components/MUILayoutWrapper.jsx
import React from 'react';
import MUIThemeProvider from '../../theme/MUIProvider';

export default function MUILayoutWrapper({ children }) {
  return (
    <MUIThemeProvider>
      <div className="mui-layout-wrapper">
        {children}
      </div>
    </MUIThemeProvider>
  );
}