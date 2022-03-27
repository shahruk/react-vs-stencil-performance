import logo from './logo.svg';
import './App.css';
import React, { Suspense, useCallback } from 'react';
import { useState } from 'react';
const SecondComponent = React.lazy(() => import('./components/second-component'));
function App() {
  const [childElements, setElements] = useState([]);
  const onClick = useCallback(() => {
    const newChildElements = [...childElements];
    for (var i = 0; i < 1000; i++) {
      newChildElements.push(i)

    }
    setElements(newChildElements);
  }, [childElements])

  return (
    <div>
      <button onClick={onClick}>Click Me</button>
      <h1>{childElements.length} children</h1>
      <ul>
        <Suspense fallback={<div>Loading...</div>}>
        {childElements.map((element, index) => {
          return <li key={index}><SecondComponent></SecondComponent></li>
        })}
        </Suspense>
      </ul>
    </div>
  );
}

export default App;
