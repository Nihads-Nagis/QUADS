// src/theme/MUIThemeProvider.jsx
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useColorMode } from '@docusaurus/theme-common';
import CssBaseline from '@mui/material/CssBaseline';

export default function MUIThemeProvider({ children }) {
  const { colorMode } = useColorMode();

  const theme = createTheme({
    palette: {
      mode: colorMode,
      primary: {
        main: colorMode === 'light' ? '#1976d2' : '#90caf9',
        light: colorMode === 'light' ? '#42a5f5' : '#bbdefb',
        dark: colorMode === 'light' ? '#1565c0' : '#64b5f6',
        contrastText: colorMode === 'light' ? '#ffffff' : '#000000',
      },
      secondary: {
        main: colorMode === 'light' ? '#dc004e' : '#f48fb1',
        light: colorMode === 'light' ? '#e91e63' : '#f8bbd9',
        dark: colorMode === 'light' ? '#c51162' : '#f06292',
      },
      background: {
        default: colorMode === 'light' ? '#ffffff' : '#121212',
        paper: colorMode === 'light' ? '#f5f5f5' : '#1e1e1e',
      },
      text: {
        primary: colorMode === 'light' ? '#1a1a1a' : '#e0e0e0',
        secondary: colorMode === 'light' ? '#666666' : '#a0a0a0',
      },
    },
    typography: {
      fontFamily: 'var(--ifm-font-family-base)',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1.1rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: colorMode === 'light' 
              ? '0 2px 4px rgba(0,0,0,0.1)'
              : '0 2px 4px rgba(255,255,255,0.1)',
            overflow: 'hidden',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colorMode === 'light' ? '#ffffff' : '#121212',
            color: colorMode === 'light' ? '#1a1a1a' : '#e0e0e0',
            boxShadow: 'none',
            borderBottom: `1px solid ${colorMode === 'light' ? '#e0e0e0' : '#333333'}`,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: colorMode === 'light' ? '#1976d2' : '#90caf9',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}