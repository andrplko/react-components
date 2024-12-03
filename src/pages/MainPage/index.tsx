import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Main from '../../components/Main';
import EmptyState from '../../components/EmptyState';
import { Release } from '../../types';
import { LOCAL_STORAGE_SEARCH_TERM } from '../../constants';
import { fetchReleases } from '../../services/apiService';
import styles from './MainPage.module.scss';

const MainPage = () => {
  const [, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem(LOCAL_STORAGE_SEARCH_TERM) || ''
  );
  const [releases, setReleases] = useState<Release[]>([]);

  const getReleases = async () => {
    setIsLoading(true);
    try {
      const { results, pagination } = await fetchReleases(
        searchTerm,
        currentPage,
        perPage
      );
      setReleases(results || []);
      setCurrentPage(pagination.page);
      setTotalPages(pagination.pages);
      setPerPage(pagination.per_page);
      setSearchParams({
        q: searchTerm,
        page: String(pagination.page),
        per_page: String(pagination.per_page),
      });
    } catch (error) {
      setReleases([]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReleases();
  }, [searchTerm, currentPage, perPage]);

  return (
    <div className={styles.container}>
      <Header setSearchTerm={setSearchTerm} />
      {!(isLoading || releases.length) ? (
        <EmptyState />
      ) : (
        <Main
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          perPage={perPage}
          setPerPage={setPerPage}
          releases={releases}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default MainPage;
