import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const dropdownValues: number[] = [4, 6, 8, 10, 12];

const Dropdown = ({ perPage, setPerPage, setCurrentPage }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('Select value');
  const [selectedItem, setSelectedItem] = useState<number>(perPage);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleItemClick = (value: number) => {
    setSelected(String(value));
    setSelectedItem(value);
    setPerPage(value);
    setCurrentPage(1);
  };

  const dropdownHeadClassNames = classNames(styles.dropdownHead, {
    [styles.opened]: isOpen,
    [styles.active]: selected !== 'Select value',
  });

  const selectedItemClassNames = (value: number) =>
    classNames(styles.item, {
      [styles.selected]: value === selectedItem,
    });

  useEffect(() => {
    function close(e: MouseEvent) {
      const { target } = e;
      if (target instanceof Node && !dropdownRef.current?.contains(target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener('click', close);
    }

    return function removeListener() {
      window.removeEventListener('click', close);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={dropdownRef} onClick={toggleOpen}>
      <div className={dropdownHeadClassNames}>{selected}</div>
      {isOpen && (
        <div className={styles.dropdown}>
          {dropdownValues.map((value, index) => {
            return (
              <div
                key={index}
                onClick={() => handleItemClick(value)}
                className={selectedItemClassNames(value)}
              >
                {value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
