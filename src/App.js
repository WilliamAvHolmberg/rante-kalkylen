import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import InteractiveGraph from './components/InteractiveGraph';
import ManualInputForm from './components/ManualInputForm';

function App() {
  const [useGraph, setUseGraph] = useState(true);
  const [data, setData] = useState([]);

  const toggleInputMethod = () => {
    setUseGraph(!useGraph);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Interactive Savings Calculator
      </Typography>
      <Box mb={2}>
        <Button variant="contained" onClick={toggleInputMethod}>
          {useGraph ? 'Switch to Manual Input' : 'Switch to Graph Input'}
        </Button>
      </Box>
      {useGraph ? (
        <InteractiveGraph data={data} setData={setData} />
      ) : (
        <ManualInputForm data={data} setData={setData} />
      )}
    </Container>
  );
}

export default App;
