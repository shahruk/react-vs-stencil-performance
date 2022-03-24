import logo from './logo.svg';
import './App.css';
import React, { Suspense } from 'react';
import { useState } from 'react';
const SecondComponent = React.lazy(() => import('./components/second-component'));
function App() {
  let [childElements, setElements] = useState([]);

  function onClick() {
    for(var i = 0; i < 1000; i++) {
      childElements = [
        ...childElements,
        <SecondComponent></SecondComponent>
      ];
      setElements(childElements);
    }
  }

  return (
    <div>
      <button onClick={() => onClick()}>Click Me</button>
      <h1>{ childElements.length } children</h1>
      <ul>
        <Suspense fallback={<div>Loading...</div>}>

          { childElements.map((element, index) => {
            return <li key={index}>{element}</li>
          })}
        </Suspense>
      </ul>
    </div>
  );
} 

export default App;
