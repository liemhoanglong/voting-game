import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

import { RoutableModalUrl } from 'constants/router';

const routableModalPaths = Object.values(RoutableModalUrl);

export function useRoutableModal(defaultPath = '/') {
  const location = useLocation();
  const history = useHistory();

  const { bgLocation, modalLocation } = location.state || {};
  const hasModal = Boolean(modalLocation);

  const routableNavigation = () => {
    const { pathname } = location;
    if (routableModalPaths.includes(pathname)) {
      history.replace(defaultPath, {
        modalLocation: location,
      });
    }
  };

  useEffect(() => {
    routableNavigation();
  }, []);

  useEffect(() => {
    if (hasModal) {
      history.push(modalLocation.pathname, {
        bgLocation: location,
      });
    }
  }, [hasModal]);

  return { location, bgLocation };
}
