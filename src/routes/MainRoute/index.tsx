import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import Home from '../../pages/Home';

const MainRoute = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default MainRoute;
