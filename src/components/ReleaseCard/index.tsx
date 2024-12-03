import { Release } from '../../types';
import styles from './ReleaseCard.module.scss';

interface ReleaseCardProps {
  release: Release;
}

const ReleaseCard = ({ release }: ReleaseCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img
          src={release.cover_image}
          alt={release.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{release.title}</h3>
        <div className={styles.description}>
          <p className={styles.text}>Year: {release.year}</p>
          <p className={styles.text}>Genres: {release.genre.join(', ')}</p>
          <p className={styles.text}>Style: {release.style.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default ReleaseCard;
