export const createQuery = (
  searchTerm: string,
  currentPage: number,
  perPage: number
): URLSearchParams => {
  const queryParams = new URLSearchParams({
    q: searchTerm.trim(),
    type: 'release',
    page: String(currentPage),
    per_page: String(perPage),
    key: 'AyyuOYnNpDGwMNjfpPCb',
    secret: 'VZIzlQzsmldhOYpSFEVzJuscZDJjxAOq',
  });

  return queryParams;
};
