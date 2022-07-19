import React, { useContext, useEffect, useState } from 'react';
import {
  useForm, useFormState, Controller, useWatch,
} from 'react-hook-form';
import InputMask from 'react-input-mask';
import classNames from 'classnames';

import imgClose from '../../assets/close.svg';
import imgSuccess from '../../assets/form-success.svg';
import imgError from '../../assets/form-error.svg';
import Card from '../Card';
import { ICard } from '../../types/card';
import { AppContext } from '../../providers/AppProvider';

import styles from './styles.module.scss';

type props = {
  onClose? : VoidFunction;
  selectedIndex: number;
}

const CardDetails: React.FC<props> = ({
  onClose = () => {},
  selectedIndex,
}) => {
  const [cardData, setCardData] = useState<ICard>();
  const [isExist, setIsExist] = useState<boolean>(false);
  const { cards, setCards } = useContext(AppContext);

  const {
    register, handleSubmit, control, formState: { errors }, setValue,
  } = useForm();

  const { isSubmitted } = useFormState({ control });

  const onSubmit = (formData: ICard) => {
    if (selectedIndex < 0) {
      setCards([...cards, formData]);
    } else {
      setCards((prev) => {
        prev.splice(selectedIndex, 1, formData);
        return [...prev];
      });
    }
    onClose();
  };

  const onDelete = () => {
    cards.splice(selectedIndex, 1);
    setCards([...cards]);
    onClose();
  };

  const checkNumber = (value: number) => {
    const isNotUnique = cards.some((item: ICard) => item.number === value);
    const isUpdating = selectedIndex >= 0 ? cards[selectedIndex].number === value : false;
    const isValidNumber = isUpdating ? true : !isNotUnique;
    setIsExist(!isValidNumber);
    return isValidNumber;
  };

  const watchedNumber = useWatch({
    control,
    name: 'number',
  });

  const numberErrorMsg = () => {
    if (!isExist && errors.number) {
      return errors.number.message;
    } if (isExist) {
      return 'The Number is already registered';
    } return '';
  };

  const getFieldColor = (fieldName: string, type: 'border' | 'color') => {
    if (type === 'border') {
      return classNames(
        'mt-1 w-full border-b bg-gray-50 flex',
        {
          'border-dark-10': !errors[fieldName],
          'border-green': isSubmitted && !errors[fieldName],
          'border-rose': errors[fieldName],
        },
      );
    }

    return classNames(
      'block sm:text-sm outline-none flex-1',
      {
        'text-dark-30': !errors[fieldName],
        'text-green': isSubmitted && !errors[fieldName],
        'text-rose': errors[fieldName],
      },
    );
  };

  useEffect(() => {
    setIsExist(false);
  }, [watchedNumber]);

  useEffect(() => {
    if (selectedIndex >= 0) {
      setCardData(cards[selectedIndex]);
      setValue('name', cards[selectedIndex].name);
      setValue('number', cards[selectedIndex].number);
      setValue('expireDate', cards[selectedIndex].expireDate);
      setValue('cvc', cards[selectedIndex].cvc);
    }
  }, []);

  return (
    <>
      <div className={styles.formWrapper}>
        <div className={styles.closeBtnWrapper}>
          <button type="button" onClick={() => onClose()}>
            <img src={imgClose} alt="Close Button" />
          </button>
        </div>
        <p className={styles.title}>{selectedIndex >= 0 ? 'Edit your card' : 'Add your card'}</p>
        {cardData && <Card isNotEditable {...cardData} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.itemWrapper}>
            <label htmlFor="name" className={styles.title}>
              Name in card
            </label>
            <div
              className={getFieldColor('name', 'border')}
            >
              <input
                type="text"
                className={getFieldColor('name', 'color')}
                placeholder="Jane Doe"
                maxLength={20}
                {...register('name', { required: { value: true, message: 'Please fill in your name' } })}
              />
              {isSubmitted && <img role="button" src={errors.name ? imgError : imgSuccess} alt="form-field-status" />}
            </div>
            { errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>

          <div className={styles.itemWrapper}>
            <label htmlFor="number" className={styles.title}>
              Card number
            </label>
            <div className={getFieldColor('number', 'border')}>
              <Controller
                name="number"
                rules={{
                  required: { value: true, message: 'Please fill in your credit card number' },
                  pattern: { value: /^(\d{4} ){3}\d{4}$/i, message: 'Please enter a valid credit card number' },
                  validate: (value) => checkNumber(value),
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputMask mask="9999 9999 9999 9999" value={value ?? ''} onChange={onChange}>
                    {(inputProps: any) => (
                      <input
                        {...inputProps}
                        type="tel"
                        placeholder="0912 0230 1094 4123"
                        className={getFieldColor('number', 'color')}
                      />
                    )}
                  </InputMask>
                )}
              />
              {isSubmitted && <img role="button" src={errors.number ? imgError : imgSuccess} alt="form-field-status" />}
            </div>
            <span className={styles.error}>{numberErrorMsg()}</span>
          </div>

          <div className={styles.itemWrapper}>
            <label htmlFor="expireDate" className={styles.title}>
              Expiry Date
            </label>
            <div className={getFieldColor('expireDate', 'border')}>
              <Controller
                name="expireDate"
                rules={{
                  required: { value: true, message: 'Please fill in your expiry date' },
                  pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/i, message: 'Please enter a valid expiry date' },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputMask mask="99/99" value={value ?? ''} onChange={onChange}>
                    {(inputProps: any) => (
                      <input
                        {...inputProps}
                        className={getFieldColor('expireDate', 'color')}
                        type="tel"
                        placeholder="MM/YY"
                      />
                    )}
                  </InputMask>
                )}
              />
              {isSubmitted && <img role="button" src={errors.expireDate ? imgError : imgSuccess} alt="form-field-status" />}
            </div>
            {errors.expireDate && <span className={styles.error}>{errors.expireDate.message}</span>}
          </div>

          <div className={styles.itemWrapper}>
            <label htmlFor="cvc" className={styles.title}>
              CVC (Security code)
            </label>
            <div className={getFieldColor('cvc', 'border')}>
              <input
                type="tel"
                maxLength={3}
                minLength={3}
                className={getFieldColor('cvc', 'color')}
                placeholder="001"
                {...register('cvc', {
                  required: { value: true, message: 'Please fill in your security code' },
                  pattern: { value: /^[0-9]{3,4}$/, message: 'Please enter a valid security code' },
                })}
              />
              {isSubmitted && <img role="button" src={errors.cvc ? imgError : imgSuccess} alt="form-field-status" />}
            </div>
            {errors.cvc && <span className={styles.error}>{errors.cvc.message}</span>}
          </div>

          <button type="submit" className={styles.confirmBtn}>Confirm</button>
        </form>
        {selectedIndex >= 0 && <button type="button" className={styles.deleteBtn} onClick={() => onDelete()}>Delete card</button>}
      </div>
      <div role="button" aria-label="overlay" className={styles.area} onClick={() => onClose()} />
    </>
  );
};

export default CardDetails;
