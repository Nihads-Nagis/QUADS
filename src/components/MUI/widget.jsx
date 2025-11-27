// src/components/MUISample.jsx
import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Switch,
  FormControlLabel,
  Paper,
} from '@mui/material';
import { useColorMode } from '@docusaurus/theme-common';
import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';

export default function MUISample() {
  const { colorMode, setColorMode } = useColorMode();

  const handleThemeChange = (event) => {
    setColorMode(event.target.checked ? 'dark' : 'light');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom color="primary">
          Material-UI Integration
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          This demonstrates Material-UI components working seamlessly with Docusaurus.
        </Typography>
        
        <FormControlLabel
          control={
            <Switch
              checked={colorMode === 'dark'}
              onChange={handleThemeChange}
              color="primary"
            />
          }
          label={`${colorMode === 'dark' ? 'Dark' : 'Light'} Mode`}
          sx={{ mb: 2 }}
        />
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h3">
                Components
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Fully integrated Material-UI components with Docusaurus theming.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Chip label="Primary" color="primary" size="small" />
              <Chip label="Secondary" color="secondary" size="small" />
              <Chip label="Default" variant="outlined" size="small" />
            </Box>
            <Button variant="contained" color="primary" sx={{ mr: 1 }}>
              Primary
            </Button>
            <Button variant="outlined" color="secondary">
              Secondary
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PaletteIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h3">
                Theming
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Automatic theme synchronization between Docusaurus and Material-UI.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Current theme: <strong>{colorMode}</strong>
            </Typography>
            <Button variant="contained" color="secondary" fullWidth>
              Get Started
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}