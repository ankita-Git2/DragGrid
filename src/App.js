import React from 'react';
import MyDataGrid from './Component/DataGrid';
import TaskBoard from './Component/TaskBoard';

function App() {
  return (
    <div className="App">
      <h1>4. DataGrid </h1>
      <MyDataGrid />
      <h1>5. Drag & Drop Task Board</h1>
      <TaskBoard />
    </div>
  );
}

export default App;
