import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "@src/slices/user-slice";
import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";

const store = configureStore({
   reducer: {
      user: userSlice.reducer,
   },
});

export const ReduxStoreProvider: FC<{ children: ReactNode; }> = ({ children }) => {
   return (
      <Provider store={store}>{children}</Provider>
   );
};