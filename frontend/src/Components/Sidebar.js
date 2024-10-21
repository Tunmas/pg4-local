import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import '../Styles/Sidebar.css';

const Sidebar = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="sidebar">
      <h2>Menú</h2>
      {isAuthenticated}
      <ul>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/crear-clientes">Crear Clientes</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
