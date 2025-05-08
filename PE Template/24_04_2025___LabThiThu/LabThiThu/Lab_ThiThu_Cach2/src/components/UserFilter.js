import React from 'react';
import { Form } from 'react-bootstrap';

const UserFilter = ({ users, filterUsers, setFilterUsers }) => {

  const handleUserFilterChange = (userId) => {
    setFilterUsers((prevFilterUsers) => {
      if (prevFilterUsers.includes(userId)) {
        return prevFilterUsers.filter((id) => id !== userId);
      } else {
        return [...prevFilterUsers, userId];
      }
    });
  };

  return (
    <div>
      <h5>Users</h5>
      {users.map(user => (
        <Form.Check
          key={user.id}
          type="checkbox"
          label={user.name}
          value={user.id}
          checked={filterUsers.includes(user.id.toString())}
          onChange={(e) => handleUserFilterChange(e.target.value)}
        />
      ))}
    </div>
  );
};

export default UserFilter;
