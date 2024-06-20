import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditFormation = ({ formationId, theme, description, onUpdate }) => {
  const [newTheme, setNewTheme] = useState(theme);
  const [newDescription, setNewDescription] = useState(description);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/formations/edit/${formationId}`, {
        theme: newTheme,
        description: newDescription
      });
      onUpdate(); // Call the onUpdate function
      navigate(`/dashboards/listeFormation`);
    } catch (error) {
      console.error('Error updating formation:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Thème</label>
          <input type="text" value={newTheme} onChange={(e) => setNewTheme(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default EditFormation;


