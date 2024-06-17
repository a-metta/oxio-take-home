import { useUsers } from '@hooks/useUsers';
import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from '@vis.gl/react-google-maps';

function MapView() {
  const { users } = useUsers();
  const mapData =
    users?.map((user) => {
      return {
        id: user.id,
        name: user.name,
        geo: user.address.geo,
      };
    }) ?? [];

  return (
    <>
      <h1>Users Geographical Distribution</h1>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          style={{ width: '100vw', height: '100vh', marginTop: '1rem' }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {mapData.map((user) => (
            <Marker
              key={user.id}
              label={{
                text: user.name,
                className:
                  'bg-white bg-opacity-60 text-black p-1 rounded-lg shadow-md text-xs font-bold',
              }}
              position={{
                lat: parseFloat(user.geo.lat),
                lng: parseFloat(user.geo.lng),
              }}
            />
          ))}
        </GoogleMap>
      </APIProvider>
    </>
  );
}

export default MapView;
