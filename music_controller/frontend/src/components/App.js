import React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';

const App = () => {
  return <div>Appssssss</div>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'home',
    element: <HomePage />,
  },
  {
    path: 'home/create',
    element: <CreateRoomPage />,
  },
  {
    path: 'home/join',
    element: <RoomJoinPage />,
  },
]);

const app = ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
