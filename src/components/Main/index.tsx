import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import Wrapper from '../Wrapper';
import Loader from '../Loader';
import ReleasesList from '../ReleasesList';
import Pagination from '../Pagination';
import Dropdown from '../Dropdown';
import CloseButton from '../CloseButton';
import { Pathnames, Release } from '../../types';
import styles from './Main.module.scss';

interface MainProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  releases: Release[];
  isLoading: boolean;
}

const Main = ({
  currentPage,
  setCurrentPage,
  totalPages,
  perPage,
  setPerPage,
  releases,
  isLoading,
}: MainProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  const storedIsOpen = localStorage.getItem('isOpen');
  const [isOpen, setIsOpen] = useState(
    storedIsOpen ? JSON.parse(storedIsOpen) : false
  );

  useEffect(() => {
    localStorage.setItem('isOpen', JSON.stringify(isOpen));
    if (!id) {
      setIsOpen(false);
    }
  }, [isOpen, id]);

  const handleLeftSectionClick = () => {
    if (isOpen) {
      setIsOpen(false);
      navigate(`${Pathnames.index}${search}`);
    }
  };

  const rightSectionClasses = classNames(styles.rightSection, {
    [styles.hidden]: !isOpen,
  });

  return (
    <main className={styles.main}>
      <Wrapper>
        <div className={styles.container}>
          <section
            onClick={handleLeftSectionClick}
            className={styles.leftSection}
          >
            <Dropdown
              perPage={perPage}
              setPerPage={setPerPage}
              setCurrentPage={setCurrentPage}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <div className={styles.wrapper}>
                <ReleasesList
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPage={perPage}
                  releases={releases}
                  setIsOpen={setIsOpen}
                />
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  isLoading={isLoading}
                />
              </div>
            )}
          </section>
          <section className={rightSectionClasses}>
            <CloseButton setIsOpen={setIsOpen} />
            <Outlet />
          </section>
        </div>
      </Wrapper>
    </main>
  );
};

export default Main;
