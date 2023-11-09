import { createQuery } from '../helpers/createQuery';
import { ReleasesResponse } from '../types';

const { VITE_BASE_URL, VITE_RELEASES_URL } = import.meta.env;

export const fetchReleases = async (
  searchTerm: string,
  currentPage: number,
  perPage: number
) => {
  try {
    const queryParams = createQuery(searchTerm, currentPage, perPage);

    const response = await fetch(`${VITE_BASE_URL}?${queryParams}`, {
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
    const response = await fetch(`${VITE_RELEASES_URL}${id}`);

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
