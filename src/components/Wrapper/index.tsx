import { ChildrenProps } from '../../types';
import styles from './Wrapper.module.scss';

const Wrapper = ({ children }: ChildrenProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
