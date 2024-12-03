import LogoImage from '../../assets/logo.svg';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.container}>
      <img src={LogoImage} alt="logo" className={styles.image} />
      <h1 className={styles.title}>Find Music</h1>
    </div>
  );
};

export default Logo;
