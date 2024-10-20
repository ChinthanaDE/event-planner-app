import {useState, useEffect} from 'react';
import {getPosts, getPhotos} from '../services/eventApi';
import {AppEvent} from '../types/event';

export const useFetchEvents = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, photosResponse] = await Promise.all([
          getPosts(),
          getPhotos(),
        ]);

        const combinedData: AppEvent[] = eventsResponse.data.map(
          (event, index) => ({
            id: event.id,
            title: event.title,
            body: event.body,
            thumbnailUrl: photosResponse.data[index]?.thumbnailUrl || '',
            url: photosResponse.data[index]?.url || '',
          }),
        );

        setEvents(combinedData.slice(0, 10));
        setLoading(false);
      } catch (error) {
        setError('Error fetching events');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {events, loading, error};
};
