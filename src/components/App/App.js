import './App.css';
import React, { useReducer, useState} from 'react';

const formReducer = (state, event) => {
  if(event.reset){
    return {
      apple:  '',
      count: 0,
      name: '',
      'gift-wrap': false,
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {
    count: 100,
  });
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
   
    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true
      })
    }, 3000)
  }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    })
  }

  return (
    <div className='wrapper'>
      <h1>How About Them Apples</h1>
      {submitting && 
      <div>You are subbmiting the following:
        <ul>
          {Object.entries(formData).map(([name, value]) => (
            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
          ))}
        </ul>
      </div>}
      <form onSubmit={handleSubmit}>
          <label>
            <p>Name</p>
            <input disabled={submitting} name="name" 
              onChange={handleChange} value={formData.name || ''}/>
          </label>
          <label>
            <p>Apples</p>
            <select disabled={submitting} name="apple" 
              onChange={handleChange} value={formData.apple || ''}>
              <option value="">--Please choose an option--</option>
              <option value="fuji">Fuji</option>
              <option value="jonathan">Jonathan</option>
              <option value="honey-crisp">Honey Crisp</option>
            </select>
          </label>
          <label>
            <p>Count</p>
            <input disabled={submitting} type="number" 
              name="count" onChange={handleChange} 
              value={formData.count || ''}/>
          </label>
          <label>
            <p>Gift Wrap</p>
            <input disabled={submitting} type="checkbox" 
              name="gift-wrap" onChange={handleChange} 
              checked={formData['gift-wrap'] || false}/>
          </label>
        <button type='submit' disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

export default App;
