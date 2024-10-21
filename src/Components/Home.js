// src/Components/Home.js
import React from 'react';

const Home = ({ isAuthenticated }) => {
  const tecnologiasColumna1 = ['React', 'Node.js', 'Express', 'MongoDB (Atlas)'];
  const tecnologiasColumna2 = ['Auth0', 'Bootstrap', 'Vercel', 'Swagger'];

  return (
    <div className={`container text-center ${isAuthenticated ? 'pt-5' : 'pt-5 mt-5'}`}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="display-3 mb-4">Programación 3 Final</h1> {/* Aumentar tamaño de título */}
          <h5 className="text-muted mb-4">Alumno: Joaquín Morales</h5>
          <p className="lead fs-4">Tecnologías utilizadas:</p> {/* Aumentar tamaño de texto */}
          <div className="row">
            {/* Primera columna */}
            <div className="col-md-6">
              <ul className="list-group list-group-flush fs-5"> {/* Aumentar tamaño de texto de la lista */}
                {tecnologiasColumna1.map((tecnologia, index) => (
                  <li className="list-group-item" key={index}>{tecnologia}</li>
                ))}
              </ul>
            </div>

            {/* Segunda columna */}
            <div className="col-md-6">
              <ul className="list-group list-group-flush fs-5"> {/* Aumentar tamaño de texto de la lista */}
                {tecnologiasColumna2.map((tecnologia, index) => (
                  <li className="list-group-item" key={index}>{tecnologia}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
