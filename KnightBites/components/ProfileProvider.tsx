import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Profile } from '@/interfaces/Profile';

interface ProfileContextProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export const defaultProfile: Profile = {
  username: '',
  pref_name: '',
  email: '',
  restrictions: {
    halal: false,
    vegan: false,
    vegetarian: false,
  },
  loggedIn: false,
};

export const ProfileContext = createContext<ProfileContextProps>({
  profile: defaultProfile,
  setProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
