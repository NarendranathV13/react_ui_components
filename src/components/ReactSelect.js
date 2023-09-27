import React from 'react';
import Select from 'react-select';

const options = [
  { value:'Tamil', label: 'Tamil'},
  { value:'English',label: 'English'},
  { value:'Malayalam', label: 'Malayalam'},
  { value:'Telegu',label: 'Telegu'},
];

const ReactSelect = () => {
  const handleChange = (selectedOption) => {
    console.log(`Selected:`, selectedOption);
  };

  return (
    <div>
      <Select
        options={options}
        onChange={handleChange}
        isMulti //to select multiple options
        placeholder="Select Languages"
      />
    </div>
  );
};

export default ReactSelect;