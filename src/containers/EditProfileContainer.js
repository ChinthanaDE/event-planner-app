import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import EditProfilePresenter from '../components/EditProfilePresenter';

const EditProfileContainer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userProfile} = route.params;

  const [profile, setProfile] = useState(userProfile);

  const handleSave = () => {
    // Todo:: Save changes to backend
    navigation.goBack();
  };

  return (
    <EditProfilePresenter
      profile={profile}
      setProfile={setProfile}
      handleSave={handleSave}
      navigation={navigation}
    />
  );
};

export default EditProfileContainer;
