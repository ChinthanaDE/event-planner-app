import { useState, useEffect } from 'react';
import eventApi from '../services/eventApi';

export const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, photosResponse] = await Promise.all([
          eventApi.get('/posts'),
          eventApi.get('/photos')
        ]);

        const combinedData = eventsResponse.data.map((event, index) => ({
          ...event,
          thumbnailUrl: photosResponse.data[index]?.thumbnailUrl,
          url: photosResponse.data[index]?.url
        }));

        setEvents(combinedData.slice(0, 10));
        setLoading(false);
      } catch (error) {
        setError('Error fetching events');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { events, loading, error };
};