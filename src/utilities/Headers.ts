import { getLocation } from './Location';

import Coordinates from '@/model/Coordinates';

export const addHeaders = async () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('User-Agent', navigator.userAgent);

  const coordinates: Coordinates = await getLocation();
  headers.append('X-Longitude', coordinates.longitude.toString());
  headers.append('X-Latitude', coordinates.latitude.toString());

  return headers;
};

export const addSecureHeaders = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const headers = new Headers();

    if (accessToken) {
      headers.append('Authorization', 'Bearer ' + accessToken);
    } else {
      throw new Error('Access Token could not be found');
    }

    if (refreshToken) {
      headers.append('Refresh-Token', refreshToken);
    } else {
      throw new Error('Refresh Token could not be found');
    }

    headers.append('Content-Type', 'application/json');
    headers.append('User-Agent', navigator.userAgent);

    const coordinates = await getLocation();
    headers.append('X-Longitude', coordinates.longitude.toString());
    headers.append('X-Latitude', coordinates.latitude.toString());

    return headers;
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
  }
};
