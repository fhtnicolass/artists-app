import React, { useState, useEffect } from 'react';
import './user_index.css'

const UserCrudPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
 
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8000/users/');
    const data = await response.json();
    setUsers(data);
  };

  const addUser = async user => {
    const response = await fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setUsers([...users, data]);
    fetchUsers();
  };

  const updateUser = async user => {
    const response = await fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    const updatedUsers = users.map(item => (item.id === data.id ? data : item));
    setUsers(updatedUsers);
    setEditing(false);
    fetchUsers();
  };

  const deleteUser = async id => {
    await fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE',
    });
    const updatedUsers = users.filter(item => item.id !== id);
    setUsers(updatedUsers);
    fetchUsers();
  };

  const editUser = user => {
    setEditing(true);
    setCurrentUser({ ...user });
    fetchUsers();
  };

  return (
    <div className="user-container">
      <h1 className="title">Gerenciamento de Usuários</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="user-row">
              <td>
                  {user.name}
                
              </td>
              <td>
                  {user.email}
              </td>

              <td>
                <button onClick={() => editUser(user)} className="edit-btn">
                  Editar
                </button>
                <button onClick={() => deleteUser(user.id)} className="delete-btn">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {/* Caso editar seja == true, altera para o layout de edição */}
          {editing ? (
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  value={currentUser.name}
                  onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </td>
              <td>
                <button onClick={() => updateUser(currentUser)} className="update-btn">
                  Update
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Insira o nome"
                  onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  placeholder="Insira o email"
                  onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </td>
              <td>
                <button onClick={() => addUser(currentUser)} className="add-btn">
                  Adicionar
                </button>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
};

export default UserCrudPage;