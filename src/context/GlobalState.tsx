import { createContext, useReducer, ReactNode } from "react";
import reducer from "./reducer";
import { State, Action } from "../types"; 

const initialState: State = {
  products: [],
  cart: [],
  user: null,
  categories: [],
  selectedCategory: "all",
};

export const GlobalContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
