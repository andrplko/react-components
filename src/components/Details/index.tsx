import { useEffect, useState } from 'react';
import { fetchSingleRelease } from '../../services/apiService';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import styles from './Details.module.scss';

interface ReleaseItem {
  artists: Array<{ name: string }>;
  title: string;
  tracklist: Array<{ title: string; duration: string }>;
}

const Details = () => {
  const { id } = useParams();
  const [releaseData, setReleaseData] = useState<ReleaseItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSingleRelease = async () => {
    setIsLoading(true);
    if (!id) return;

    try {
      const data: ReleaseItem = await fetchSingleRelease(id);
      setReleaseData(data);
    } catch (error) {
      setReleaseData(null);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleRelease();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {releaseData?.artists.map((artist) => artist.name).join(', ')}
      </h2>
      <h3 className={styles.title}>{releaseData?.title}</h3>
      <ul className={styles.tracklist}>
        {releaseData?.tracklist.map((track, index) => {
          return (
            <li key={index} className={styles.track}>
              <span>{`${index + 1}. ${track.title}`}</span>
              <span>{track.duration}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Details;
