import React from 'react';
import './App.css';
import Test from '@test/test'

function App() {
  const test = new Test(3333)
  console.log(test.printId())
  return (
    <div className="App">
      <p>测试</p>
    </div>
  );
}

export default App;
