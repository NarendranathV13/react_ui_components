import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';

const AutoComplete = () => {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://65002c0e18c34dee0cd46da3.mockapi.io/Languages')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({label: item.name }));
        setItems(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filterItems = (inputValue) => {
    return items.filter(item =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Auto complete</h1>
      <Autocomplete
        items={filterItems(value)}
        getItemValue={item => item.label}
        renderItem={(item, isHighlighted) => (
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.label}
          </div>
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSelect={(value) => setValue(value)}
      />
    </div>
  );
};

export default AutoComplete;
