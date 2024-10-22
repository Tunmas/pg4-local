import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Asegúrate de importar Spinner

const EditarCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCliente();
  }, []);

  const fetchCliente = async () => {
    try {
      const response = await axios.get(`https://prog3-final-backend.vercel.app/api/usuarios/${id}`);
      setCliente(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cliente', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://prog3-final-backend.vercel.app/api/usuarios/${id}`, cliente);
      navigate('/clientes'); // Redirige de vuelta a la lista de clientes
    } catch (error) {
      console.error('Error updating cliente', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input 
            type="text" 
            className="form-control" 
            name="nombre" 
            value={cliente.nombre} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={cliente.email} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input 
            type="text" 
            className="form-control" 
            name="telefono" 
            value={cliente.telefono} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input 
            type="text" 
            className="form-control" 
            name="direccion" 
            value={cliente.direccion} 
            onChange={handleInputChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarCliente;
