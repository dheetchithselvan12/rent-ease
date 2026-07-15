import { createSlice } from "@reduxjs/toolkit";

const getStoredAuth = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null, isAuthenticated: false };
  }

  const storedUser = window.localStorage.getItem("authUser");
  const storedToken = window.localStorage.getItem("authToken");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuthenticated: Boolean(storedToken),
  };
};

const initialState = getStoredAuth();

const syncStoredUser = (user) => {
  if (typeof window === "undefined") return;

  if (user) {
    window.localStorage.setItem("authUser", JSON.stringify(user));
  } else {
    window.localStorage.removeItem("authUser");
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        window.localStorage.setItem("authToken", action.payload.token);
        syncStoredUser(action.payload.user);
      }
    },
    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };

      syncStoredUser(state.user);
    },
    updateAddress: (state, action) => {
      state.user = {
        ...(state.user || {}),
        address: action.payload,
      };

      syncStoredUser(state.user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        window.localStorage.removeItem("authToken");
        syncStoredUser(null);
      }
    },
  },
});

export const { loginSuccess, updateProfile, updateAddress, logout } =
  authSlice.actions;
export default authSlice.reducer;
