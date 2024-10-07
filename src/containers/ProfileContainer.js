import React, {useState} from 'react';
import ProfilePresenter from '../components/ProfilePresenter';

const ProfileContainer = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mailingAddress: '',
  });

  return (
    <ProfilePresenter
      userProfile={userProfile}
      setUserProfile={setUserProfile}
    />
  );
};

export default ProfileContainer;
