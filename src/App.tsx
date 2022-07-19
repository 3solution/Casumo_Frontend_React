import React from 'react';
import MainRoute from './routes/MainRoute';
import './App.css';
import AppProvider from './providers/AppProvider';

const App: React.FC = () => (
  <AppProvider>
    <MainRoute />
  </AppProvider>
);

export default App;
