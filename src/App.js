import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import Home from './Components/Home'; 
import Sidebar from './Components/Sidebar'; 
import Clientes from './Components/Clientes'; 
import CrearClientes from './Components/CrearClientes'; 
import EditarCliente from './Components/EditarCliente'; 
import './App.css';

function App() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0(); 

  useEffect(() => {
    const fetchIdToken = async () => {
      if (isAuthenticated) {
        try {
          const claims = await getIdTokenClaims();
          console.log("ID Token:", claims.__raw); // Imprimir el idToken en la consola
        } catch (error) {
          console.error("Error obteniendo idTokenClaims:", error);
        }
      }
    };
    fetchIdToken();
  }, [isAuthenticated, getIdTokenClaims]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className={isAuthenticated ? "app-container" : "container"}>
          {isAuthenticated ? ( 
            <>
              <Sidebar /> 
              <div className="content-with-sidebar">
                <div className="content-container">
                  <Routes>
                    <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/crear-clientes" element={<CrearClientes />} />
                    <Route path="/editar-clientes/:id" element={<EditarCliente />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
