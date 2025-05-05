import React from "react";
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import Register from "./components/register";
import Login from './components/login';
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/dashboard";

function App()
{
  return(<Router> 
    <Routes>
            <Route path="/register" element ={<Register/>}/>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/dashboard" element={
              <PrivateRoute>
                < Dashboard/>
                </PrivateRoute>}></Route>
            
      </Routes>
      </Router>
      );
}

export default App;
