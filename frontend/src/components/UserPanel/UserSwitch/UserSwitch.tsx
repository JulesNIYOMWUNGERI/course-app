import React from "react";

import { useUserContext } from "../../../contexts/UserProviderContext";
import { AUTHENTICATED_USER_ID } from "../../../utils/utils";

const UserSwitch = () => {
  const { users, selectedUserId, setSelectedUserId } = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    localStorage.setItem(AUTHENTICATED_USER_ID, userId);
  };

  return (
    <select
      value={selectedUserId}
      onChange={handleChange}
      className="user-select"
    >
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.firstName}
        </option>
      ))}
    </select>
  );
};

export default UserSwitch;
