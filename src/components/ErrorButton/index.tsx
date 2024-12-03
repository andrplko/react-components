import { useState, useEffect } from 'react';
import styles from './ErrorButton.module.scss';

const ErrorButton = () => {
  const [error, setError] = useState<Error | null>(null);

  const throwTestError = () => {
    throw new Error('This is a test error');
  };

  const handleClick = () => {
    try {
      throwTestError();
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <button type="button" onClick={handleClick} className={styles.button}>
      Error
    </button>
  );
};

export default ErrorButton;
