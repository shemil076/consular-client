import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import themeSlice from "./theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
  },
});
