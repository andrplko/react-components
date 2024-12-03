import styles from './EmptyState.module.scss';

const EmptyState = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Not Found</h2>
    </div>
  );
};

export default EmptyState;
