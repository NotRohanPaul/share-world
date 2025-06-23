import { configureStore } from "@reduxjs/toolkit";
import { IS_SECURE_ENV } from "@src/constants/env";
import { receiverSlice, senderSlice, userSlice } from "@src/slices";
import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";

const store = configureStore({
   reducer: {
      user: userSlice.reducer,
      sender: senderSlice.reducer,
      receiver: receiverSlice.reducer,
   },
   devTools: IS_SECURE_ENV === false,
});

export const ReduxStoreProvider: FC<{ children: ReactNode; }> = ({ children }) => <Provider store={store} children={children} />;