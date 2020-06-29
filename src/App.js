import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

const App = () => {
  const [ repositories, setRepositories ] = useState([]);
  const [ repository, setRepository ] = useState('');

  // Hooks
  useEffect(() => {
    const getRepositories = async () => {
      const { data } = await api.get('/repositories');
      setRepositories(data);
    }
    
    getRepositories();
  }, [])

  // Actions
  const handleChangeAddRepository = (e) => {
    setRepository(e.target.value);
  }

  const handleAddRepository = async () => {
    const { data } = await api.post('/repositories', {
      title: repository
    })

    setRepositories([...repositories, data]);
    setRepository('');
  }

  const handleRemoveRepository = async (id) => {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li> 
        )}
      </ul> 
      <input type="text" name="title" minLength="2" maxLength="15" onChange={handleChangeAddRepository} value={repository}/>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
