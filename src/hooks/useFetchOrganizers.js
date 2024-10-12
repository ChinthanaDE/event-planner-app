import {useState, useEffect} from 'react';
import eventApi from '../services/eventApi';

export const useFetchOrganizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, photosResponse] = await Promise.all([
          eventApi.get('/users'),
          eventApi.get('/photos'),
        ]);

        const organizerData = usersResponse.data.map((organizer, index) => ({
          id: organizer.id,
          name: organizer.name,
          email: organizer.email,
          avatarUrl: photosResponse.data[index]?.url,
        }));

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
