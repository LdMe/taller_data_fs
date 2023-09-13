import React, { useState } from 'react';

function App() {

  const province = ['A Coruña', 'Alacant', 'Albacete', 'Almería', 'Araba', 'Asturias',
  'Ávila', 'Badajoz', 'Barcelona', 'Bizkaia', 'Burgos', 'Cáceres',
  'Cádiz', 'Cantabria', 'Castelló', 'Ciudad Real', 'Córdoba',
  'Cuenca', 'Gipuzkoa', 'Girona', 'Granada', 'Guadalajara', 'Huelva',
  'Huesca', 'Illes Balears', 'Jaén', 'La Rioja', 'Las Palmas',
  'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
  'Ourense', 'Palencia', 'Pontevedra', 'Salamanca',
  'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria',
  'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid',
  'Zamora', 'Zaragoza']

  const [inputs, setInputs] = useState({
    province:'',
    surface: '',
    bedrooms: '',
    restrooms: '',
    Calefaccion:false,
    Terraza:false, 
    Ascensor:false,
    Balcón:false, 
    Parking:false
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setInputs(prevInputs => {
      if (type === 'checkbox') {
        return {
          ...prevInputs,
          [name]: checked
        };
      }
  
      return {
        ...prevInputs,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    });

    const data = await response.json();

    setPrediction(data.prediction);
  };

  return (
    <div className="App">
      <h1>Housing Price Prediction</h1>
      <form onSubmit={handleSubmit}>

      <label htmlFor="province">Province:</label>
<select id="province" name="province" value={inputs.province} onChange={handleChange} required>
  <option value="">Seleccione una provincia</option>
  {province.map((province, index) => (
    <option key={index} value={province}>{province}</option>
  ))}
</select>
<br />
        <label htmlFor="surface">Surface:</label>
        <input type="text" id="surface" name="surface" value={inputs.surface} onChange={handleChange} required  pattern="\d+" 
  title="Por favor, ingrese solo números" />

        <label htmlFor="bedrooms">Bedrooms:</label>
        <input type="text" id="bedrooms" name="bedrooms" value={inputs.bedrooms} onChange={handleChange} required  pattern="\d+" 
  title="Por favor, ingrese solo números"/>

        <label htmlFor="restrooms">Restrooms:</label>
        <input type="text" id="restrooms" name="restrooms" value={inputs.restrooms} onChange={handleChange} required  pattern="\d+" 
  title="Por favor, ingrese solo números"/>

        <label htmlFor="Calefaccion">Calefaccion:</label>
          <input type="checkbox" id="Calefaccion" name="Calefaccion" checked={inputs.Calefaccion} onChange={handleChange}/>

        <label htmlFor="Terraza">Terraza:</label>
          <input type="checkbox" id="Terraza" name="Terraza" checked={inputs.Terraza} onChange={handleChange}/>

        <label htmlFor="Ascensor">Ascensor:</label>
          <input type="checkbox" id="Ascensor" name="Ascensor" checked={inputs.Ascensor} onChange={handleChange}/>

        <label htmlFor="Balcón">Balcón:</label>
          <input type="checkbox" id="Balcón" name="Balcón" checked={inputs.Balcón} onChange={handleChange}/>

        <label htmlFor="Parking">Parking:</label>
          <input type="checkbox" id="Parking" name="Parking" checked={inputs.Parking} onChange={handleChange}/>

        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <p>Predicted Price: {prediction}</p>        
      )}
    </div>
  );
}

export default App;