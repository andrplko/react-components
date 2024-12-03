import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '../../assets/close-icon.svg';
import { Pathnames } from '../../types';
import styles from './CloseButton.module.scss';

interface CloseButtonProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CloseButton = ({ setIsOpen }: CloseButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  const handleClick = () => {
    setIsOpen(false);
    navigate(`${Pathnames.index}${search}`);
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={handleClick} className={styles.button}>
        <img src={CloseIcon} alt="close icon" className={styles.image} />
      </button>
    </div>
  );
};

export default CloseButton;
