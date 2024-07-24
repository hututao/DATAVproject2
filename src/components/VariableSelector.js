import React from 'react';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Grid, Typography } from '@mui/material';

const VariableSelector = ({ selectedVariable, setSelectedVariable }) => {
  const availableVariables = ['preferred_premium_plan', 'preferred_listening_content', 'fav_music_genre', 'fav_pod_genre'];

  const handleChange = (event) => {
    setSelectedVariable(event.target.value);
  };

  const analyzeVariable = () => {
    // 分析所选变量的逻辑
    console.log('Analyzing variable:', selectedVariable);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Select a variable</FormLabel>
            <RadioGroup value={selectedVariable} onChange={handleChange}>
              {availableVariables.map((variable) => (
                <FormControlLabel
                  key={variable}
                  value={variable}
                  control={<Radio />}
                  label={variable}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={analyzeVariable}
          >
            Analyze
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h6" component="h2">
              Analysis Process
            </Typography>
            <Typography variant="body1">
              {selectedVariable ? `Analyzing ${selectedVariable}` : 'No variable selected'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VariableSelector;
