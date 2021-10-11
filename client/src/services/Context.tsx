import { useState, createContext } from 'react';

const initialState = {
  id: '',
  token: '',
  isAuthenticated: false,
  role: ''
};

const mock = {
  user: initialState,
  login: (Accesstoken: string, id: string, role: string) => { },
  logout: () => { },
}

const UserContext = createContext(mock);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (Accesstoken: string, id: string, role: string) => {
    setUser((prevState) => ({
      token: Accesstoken,
      id: id,
      isAuthenticated: true,
      role
    }));
  };

  const logout = () => {
    setUser(initialState);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };