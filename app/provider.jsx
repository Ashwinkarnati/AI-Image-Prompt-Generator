// app/provider.jsx
'use client';
import React, { useEffect, useState } from 'react';
import Header from './_components/Header';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserDetailContext } from './_context/UserDetailContext';

export const UserProvider = ({ children }) => {
  const { user } = useUser();
  const saveUser = useMutation(api.users.saveUser);
  const [userDetails, setUserDetails] = useState(null);
  const currentUser = useQuery(api.users.getUserByEmail, {
    email: user?.primaryEmailAddress?.emailAddress || ''
  });

  useEffect(() => {
    if (user) {
      saveUser({
        userName: user.fullName || '',
        userEmail: user.primaryEmailAddress?.emailAddress || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (currentUser) {
      setUserDetails(currentUser);
    }
  }, [currentUser]);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <Header />
      <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4'>
        {children}
      </div>
    </UserDetailContext.Provider>
  );
};