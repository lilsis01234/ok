import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditFormation = ({ formationId, theme, description }) => {
  const [newTheme, setNewTheme] = useState(theme)
  const [newDescription, setNewDescription] = useState(description)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/formations/edit/${formationId}`, {
        theme: newTheme,
        description : newDescription
      });
      navigate(`/admin/formation/${formationId}`)
    } catch (error) {
      console.error('Error updating formation:', error);
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <br></br>
        <label>Thème</label>
        <br></br>
        <input type="text" value={newTheme} onChange={(e) => setNewTheme(e.target.value)} />
      </div>
      <div className="form-group">
      <br></br>
        <label>Description</label>
        <br></br>
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
