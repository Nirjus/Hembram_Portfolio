// ProfileClientWrapper.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { IUser } from "@/lib/models/userSchema";

type ProfileClientWrapperProps = {
  user: IUser;
  children: React.ReactNode;
};

type UserContextType = {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a ProfileClientWrapper.");
  }
  return context;
}

export default function ProfileClientWrapper({
  user,
  children,
}: ProfileClientWrapperProps) {
  const [userState, setUser] = useState(user);

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
