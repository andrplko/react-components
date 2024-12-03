import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { generatePaginationItems } from '../../helpers/generatePaginationItems';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  isLoading: boolean;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  isLoading,
}: PaginationProps) => {
  const sequence = generatePaginationItems(currentPage, totalPages);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClick = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  const getListItemClassName = (number: number | string) => {
    if (typeof number === 'number') {
      return classNames(styles.listItem, {
        [styles.active]: number === currentPage,
      });
    }
  };

  const isPrevButtonDisabled = currentPage === 1 || isLoading;
  const isNextButtonDisabled = currentPage === totalPages || isLoading;

  const prevButtonClassnames = classNames(styles.button, {
    [styles.disabled]: isPrevButtonDisabled,
  });

  const nextButtonClassnames = classNames(styles.button, {
    [styles.disabled]: isNextButtonDisabled,
  });

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button
            type="button"
            onClick={handlePrev}
            className={prevButtonClassnames}
            disabled={isPrevButtonDisabled}
          >
            Prev
          </button>
        </li>
        {sequence.map((number, index) => {
          return (
            <li key={index} className={getListItemClassName(number)}>
              <button
                type="button"
                onClick={() => {
                  handleClick(number);
                }}
                className={styles.button}
                disabled={isLoading}
              >
                {number}
              </button>
            </li>
          );
        })}
        <li className={styles.listItem}>
          <button
            type="button"
            onClick={handleNext}
            className={nextButtonClassnames}
            disabled={isNextButtonDisabled}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
