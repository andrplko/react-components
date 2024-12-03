import { Dispatch, SetStateAction } from 'react';
import Wrapper from '../Wrapper';
import ErrorButton from '../ErrorButton';
import SearchBar from '../SearchBar';
import Logo from '../Logo';
import styles from './Header.module.scss';

interface HeaderProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const Header = ({ setSearchTerm }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.container}>
          <Logo />
          <SearchBar setSearchTerm={setSearchTerm} />
          <ErrorButton />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
