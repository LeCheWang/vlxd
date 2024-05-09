import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import React from 'react'

const App = () => {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App