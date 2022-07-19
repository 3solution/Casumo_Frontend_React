import React, { createContext, ReactNode, useState } from 'react';
import { ICard } from '../types/card';

type PropsType = {
  children: ReactNode;
};

type ContextProps = {
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
};

export const AppContext = createContext<ContextProps>({ cards: [], setCards: () => {} });

const AppProvider = ({ children }: PropsType) => {
  const [cards, setCards] = useState<ICard[]>([]);

  return (
    <AppContext.Provider
      value={{
        cards,
        setCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
