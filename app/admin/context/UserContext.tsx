// contexts/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IUser } from '@/lib/models/userSchema';

interface UserContextType {
  user: IUser | null;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  
    const refetchUser = async () => {
      try {
        const response = await axios.post('/api/admin/profile');
        setUser(response.data.user);
      } catch (error: any) {
        console.error(error.response?.data?.message || 'Error fetching user data');
      }
    };
    useEffect(() => {
        refetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
