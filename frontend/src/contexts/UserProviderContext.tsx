import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { User } from "../pages/Administration/user/types";
import { AUTHENTICATED_USER_ID } from "../utils/utils";
import {useToast} from "./ToastProvider.tsx";
import {Api} from "../api/UsersApi.tsx";

type UserContextType = {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  selectedUserId: string;
  setSelectedUserId: Dispatch<SetStateAction<string>>;
  fetchUsers: () => void;
  loading: boolean
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>(() => {
    const storedUserId = localStorage.getItem(AUTHENTICATED_USER_ID);

    return storedUserId ?? users[0]?.id ?? "";
  });

  const fetchUsers = async () => {
    await Api.fetchAllUsers(setLoading, showToast, setUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const contextValue = useMemo(
    () => ({
      users,
      setUsers,
      selectedUserId,
      setSelectedUserId,
      fetchUsers,
      loading
    }),
    [users, selectedUserId, loading],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
