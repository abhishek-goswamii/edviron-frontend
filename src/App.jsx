import { useState } from 'react'

import {  Routes, Route } from "react-router-dom";
import DashBoard from './Pages/DashBoard';

function App() {

  return (
 <>
        <Routes>
          <Route path="/" element={<DashBoard />} />
        </Routes>
 </>
  )
}

export default App
