import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  async function listAll() {
    const repo = await api.get("/repositories", {});
    setRepositories(repo.data);
  }

  useEffect(() => {
    listAll();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {      
      "title": "Frontend ReactJS",
      "url": "https://www.google.com",
      "techs": [ "ReactJS", "RegEX" ]      
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const idx = repositories.findIndex((item) => item.id === id);

    if (idx > -1) {
      repositories.splice(idx, 1);
      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository => (
          <li key={repository.id}>
          {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ) )}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
