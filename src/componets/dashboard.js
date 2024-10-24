import React, { useState, useEffect } from 'react';

const UserList = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data,setdata] = useState(null)
  const [error,seterror] = useState(null)
  
  useEffect(() => {
    const fetchUsers = async () => {
      // const response = await fetch('https://api.example.com/users');
      // const data = await response.json();
      try{
        const response = await fetch("https://api.example.com/users")
        if(!response.ok){
          throw new Error("network probelm")
        }
        const result = await response.json()
        setdata(result)
      } catch(error){
        seterror(error.message)
      } finally{
        setLoading(false)
      }

   
    }
    fetchUsers();
  }, [searchTerm]);

  const renderUserProfile = (profile) => {
    return <div dangerouslySetInnerHTML={{ __html: profile }} />;
  };

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          {renderUserProfile(user.profile)}
          <button onClick={() => {
            fetch(`/api/users/${user.id}/activate`, { method: 'POST' })
              .then(response => response.json())
              .then(data => console.log(data));
          }}>
            Activate User
          </button>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/notifications');
    ws.onmessage = (event) => {
      setNotifications(prev => [...prev, event.data]);
    };
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        onChange={handleSearch} 
        value={search}
      />
      <UserList searchTerm={search} />
      <div>
        {notifications.map((note, index) => (
          <div>{note}</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;