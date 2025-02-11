import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MostrarPersonajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPersonaje, setSelectedPersonaje] = useState(null);
  const [consulta, setConsulta] = useState('');

  useEffect(() => {
    axios
      .get('https://dragonball-api.com/api/characters?limit=10000')
      .then((response) => {
        setPersonajes(response.data.items);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener los datos');
        setLoading(false);
      });
  }, []);

  const handleConsultaChange = (e) => setConsulta(e.target.value);

  const filtrarPersonajes = personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(consulta.toLowerCase())
  );

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pagina">
      <h1>Personajes de Dragon Ball</h1>
      <br></br>
      <div className="busqueda">
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={consulta}
          onChange={handleConsultaChange}
        />
        <button onClick={() => setConsulta('')}>Limpiar búsqueda</button>
      </div>

      <div className="contenido">
        <div className="personajes-container">
          {filtrarPersonajes.map((personaje) => (
            <div
              key={personaje.id}
              className="personaje"
              onClick={() => setSelectedPersonaje(personaje)}
            >
              <h2>{personaje.name}</h2>
              <img src={personaje.image} alt={personaje.name} />
            </div>
          ))}
        </div>

        {selectedPersonaje && (
          <div className="detalles">
            <h2>{selectedPersonaje.name}</h2>
            <p><strong>Raza:</strong> {selectedPersonaje.race}</p>
            <p><strong>Género:</strong> {selectedPersonaje.gender}</p>
            <p><strong>Ki:</strong> {selectedPersonaje.ki}</p>
            <p><strong>Descripción:</strong> {selectedPersonaje.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MostrarPersonajes;
