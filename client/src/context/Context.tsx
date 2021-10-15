import { useState, createContext } from 'react';

const initialState = {
  isAuthenticated: false,
  token: '',
  _id: '',
  role: '',
  firstName: '',
  lastName: '',
};

const mock = {
  user: initialState,
  login: (
    accessToken: string,
    _id: string,
    role: string,
    firstName: string,
    lastName: string,
  ) => {},
  logout: (accessToken: string) => {},
};

const UserContext = createContext(mock);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (
    accessToken: string,
    _id: string,
    role: string,
    firstName: string,
    lastName: string,
  ) => {
    setUser((prevState) => ({
      isAuthenticated: true,
      token: accessToken,
      _id: _id,
      role,
      firstName,
      lastName,
    }));
  };

  const logout = (accessToken) => {
    setUser(initialState);
    localStorage.removeItem(accessToken);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
