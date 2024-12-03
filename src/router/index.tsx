import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorBoundaryLayout from '../components/ErrorBoundaryLayout';
import Details from '../components/Details';
import { Pathnames } from '../types';

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: Pathnames.index,
        element: <App />,
        children: [
          {
            path: Pathnames.release,
            children: [{ path: Pathnames.id, element: <Details /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
