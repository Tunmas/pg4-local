import React, { useState } from 'react';
import axios from 'axios';

const CrearCliente = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [activo, setActivo] = useState(true);
  const [mensaje, setMensaje] = useState(''); // Estado para el mensaje de notificación

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoCliente = { nombre, email, telefono, direccion, activo };

    try {
      const response = await axios.post('https://prog3-final-backend.vercel.app/api/usuarios', nuevoCliente);
      console.log('Cliente creado:', response.data);
      setMensaje(`Cliente "${nombre}" creado con éxito.`); // Mensaje personalizado
      // Reiniciar el formulario
      setNombre('');
      setEmail('');
      setTelefono('');
      setDireccion('');
      setActivo(true);
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      setMensaje('Error al crear el cliente.'); // Mensaje de error
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nuevo Cliente</h2>
      {mensaje && (
        <div className="alert alert-info" role="alert">
          {mensaje}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Crear Cliente</button>
      </form>
    </div>
  );
};

export default CrearCliente;
