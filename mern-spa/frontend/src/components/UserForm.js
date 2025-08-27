import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserForm({ selected, onSaved }) {
  const [form, setForm] = useState({ name: '', email: '', age: '' });

  useEffect(() => {
    if (selected && selected._id) {
      setForm({
        name: selected.name || '',
        email: selected.email || '',
        age: selected.age || '',
      });
    } else {
      setForm({ name: '', email: '', age: '' });
    }
  }, [selected]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (selected && selected._id) {
        await axios.put(`/api/users/${selected._id}`, form);
      } else {
        await axios.post('/api/users', form);
      }
      onSaved();
      setForm({ name: '', email: '', age: '' });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {selected && selected._id ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
}