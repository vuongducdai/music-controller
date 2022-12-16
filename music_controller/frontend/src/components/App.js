import axios from 'axios';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { axiosClient } from '../../services/api/room';
import CreateRoomPage from './CreateRoomPage';
import HomePage from './HomePage';
import RoomDetailsPage from './RoomDetailsPage';
import RoomJoinPage from './RoomJoinPage';

const App = () => {
  return <HomePage />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'create',
    element: <CreateRoomPage />,
  },
  {
    path: 'join',
    element: <RoomJoinPage />,
  },
  {
    path: 'room/:roomCode',
    element: <RoomDetailsPage />,
  },
]);

const app = ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          axiosClient(resource, init).then((res) => res.data),
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>
);

export default App;
