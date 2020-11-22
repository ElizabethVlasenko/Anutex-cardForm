import React from 'react';
import './App.scss';

import CardForm from './components/CardForm';

function App() {


  return (
    <div className="App">
      <CardForm 
        ownerName='Eli Black'
        number={1234567891021112}
        cvv2={123}
        date = {{
          month: (new Date().getMonth()+1),
          year: new Date().getFullYear()
        }}
        />
    </div>
  );
}

export default App;
