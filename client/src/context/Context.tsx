import { useState, createContext } from 'react';

const initialState = {
  isAuthenticated: false,
  token: '',
  _id: '',
  role: '',
  firstName: '',
  lastName: '',
};

// TODO: Do we still need the mock ?
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

const UserProvider = (props: { children: any }): JSX.Element => {
  const { children } = props;
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

  const logout = (accessToken: string): void => {
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
