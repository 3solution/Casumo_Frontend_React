import React, { useEffect, useState } from 'react';
import creditCardType, {
  types as CardType,
} from 'credit-card-type';
import classNames from 'classnames';

import { ICard } from '../../types/card';
import imgVisa from '../../assets/visa-logo.svg';
import imgMaster from '../../assets/mastercard-logo.svg';
import imgEdit from '../../assets/edit-icon.svg';

import styles from './styles.module.scss';

interface Props extends ICard {
  onClick?: VoidFunction;
  isNotEditable?: boolean;
}

const Card: React.FC<Props> = ({
  cvc,
  expireDate,
  name,
  number,
  isNotEditable,
  onClick = () => {},
}) => {
  const [type, setType] = useState<string>();

  useEffect(() => {
    if (number) {
      creditCardType(number.toString()).filter((card) => setType(card.type));
    }
  }, []);

  return (
    <>
      <div className={
          classNames(
            styles.wrapper,
            { [styles.masterCard]: type === CardType.MASTERCARD },
          )
        }
      >
        <div className={styles.cardTypeWrapper}>
          <div className={styles.logo}>
            <img src={type === CardType.MASTERCARD ? imgMaster : imgVisa} alt="Card Logo" />
          </div>
          <div className={styles.cvcWrapper}>
            <span className={
                classNames(
                  styles.title,
                  { [styles.masterCard]: type === CardType.MASTERCARD },
                )
              }
            >
              CVC
            </span>
            <span className={styles.value}>{cvc}</span>
          </div>
          <div className={styles.cvcWrapper}>
            <span className={
                classNames(
                  styles.title,
                  { [styles.masterCard]: type === CardType.MASTERCARD },
                )
              }
            >
              EXPIRES
            </span>
            <span className={styles.value}>{expireDate}</span>
          </div>
        </div>
        <div className={styles.cardNumberWrapper}>
          <span className={styles.title}>{name}</span>
          <span className={
                classNames(
                  styles.value,
                  { [styles.masterCard]: type === CardType.MASTERCARD },
                )
              }
          >
            { number}
          </span>
        </div>
        { !isNotEditable && (
        <button type="button" className={styles.editButton} onClick={() => onClick()}>
          <img src={imgEdit} alt="Edit Icon" />
        </button>
        )}
      </div>
    </>
  );
};

export default Card;
