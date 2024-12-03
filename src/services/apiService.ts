import { createQuery } from '../helpers/createQuery';
import { ReleasesResponse } from '../types';

const BASE_URL = 'https://api.discogs.com/database/search';
const RELEASES_URL = 'https://api.discogs.com/releases/';

export const fetchReleases = async (
  searchTerm: string,
  currentPage: number,
  perPage: number
) => {
  try {
    const queryParams = createQuery(searchTerm, currentPage, perPage);

    const response = await fetch(`${BASE_URL}?${queryParams}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ReleasesResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSingleRelease = async (id: string) => {
  try {
    const response = await fetch(`${RELEASES_URL}${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
