import React, { useContext, useState } from 'react';

import Card from '../../components/Card';
import CardDetail from '../../components/CardDetail';
import { AppContext } from '../../providers/AppProvider';
import { ICard } from '../../types/card';

import styles from './styles.module.scss';

const Home: React.FC = () => {
  const { cards } = useContext(AppContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const addNew = (): void => {
    setShowModal(true);
    setSelectedIndex(-1);
  };

  const editCard = (index: number): void => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Your cards</span>
      <span className={styles.description}>Add, edit or delete your cards any time</span>
      <div className={styles.cards}>
        {cards?.map((item: ICard, i: number) => (
          <Card
            onClick={() => editCard(i)}
            key={item.number}
            {...item}
          />
        ))}
      </div>
      <button type="button" className={styles.newBtn} onClick={() => addNew()}>Add new card</button>
      {showModal && (
        <CardDetail onClose={() => setShowModal(false)} selectedIndex={selectedIndex} />
      )}
    </div>
  );
};

export default Home;
