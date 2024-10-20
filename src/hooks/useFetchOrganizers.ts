import {useState, useEffect} from 'react';
import {getUsers, getPhotos} from '../services/eventApi';
import {Organizer} from '../types/event';

export const useFetchOrganizers = () => {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, photosResponse] = await Promise.all([
          getUsers(),
          getPhotos(),
        ]);

        const organizerData: Organizer[] = usersResponse.data.map(
          (organizer, index) => ({
            id: organizer.id,
            name: organizer.name,
            email: organizer.email,
            avatarUrl: photosResponse.data[index]?.url || '',
          }),
        );

        setOrganizers(organizerData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching organizers');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {organizers, loading, error};
};
