import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  const [editing, setEditing] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      <h1>User Data</h1>

      <UserForm
        selected={editing}
        onSaved={() => {
          setEditing(null);
          setRefresh(prev => !prev);
        }}
      />

      <UserList
        key={refresh}
        onEdit={user => setEditing(user)}
      />
    </div>
  );
}

export default App;
