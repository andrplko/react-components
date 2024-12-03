import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Pathnames, Release } from '../../types';
import ReleaseCard from '../ReleaseCard';
import { LOCAL_STORAGE_SEARCH_TERM } from '../../constants';
import styles from './ReleasesList.module.scss';

interface ReleasesListProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  perPage: number;
  releases: Release[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ReleasesList = ({
  currentPage,
  perPage,
  releases,
  setIsOpen,
}: ReleasesListProps) => {
  const searchTerm = localStorage.getItem(LOCAL_STORAGE_SEARCH_TERM) || '';

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.container}>
      {releases?.map((release: Release) => (
        <Link
          key={release.id}
          to={{
            pathname: `${Pathnames.release}/${release.id}`,
            search: new URLSearchParams({
              q: searchTerm.trim(),
              page: String(currentPage),
              per_page: String(perPage),
            }).toString(),
          }}
          onClick={handleClick}
          className={styles.link}
        >
          <ReleaseCard release={release} />
        </Link>
      ))}
    </div>
  );
};

export default ReleasesList;
