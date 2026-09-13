import { create } from 'zustand';
import { loginUser, registerUser, refreshAuthToken, fetchUserProfile, updateUserProfile } from '../services/api';

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('nb_user') || 'null'),
  token: localStorage.getItem('nb_token') || null,
  refreshToken: localStorage.getItem('nb_refresh_token') || null,
  isAuthenticated: !!localStorage.getItem('nb_token'),
  isAuthModalOpen: false,
  isProfileModalOpen: false,
  isLoading: false,
  error: null,

  setAuth: (user, accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem('nb_token', accessToken);
    if (refreshToken) localStorage.setItem('nb_refresh_token', refreshToken);
    if (user) localStorage.setItem('nb_user', JSON.stringify(user));

    set({
      user,
      token: accessToken,
      refreshToken: refreshToken || get().refreshToken,
      isAuthenticated: true,
      isAuthModalOpen: false,
      error: null
    });
  },

  logout: () => {
    localStorage.removeItem('nb_token');
    localStorage.removeItem('nb_refresh_token');
    localStorage.removeItem('nb_user');
    set({ user: null, token: null, refreshToken: null, isAuthenticated: false, error: null, isProfileModalOpen: false });
  },

  openAuthModal: () => set({ isAuthModalOpen: true, error: null }),
  closeAuthModal: () => set({ isAuthModalOpen: false, error: null }),

  openProfileModal: () => set({ isProfileModalOpen: true, error: null }),
  closeProfileModal: () => set({ isProfileModalOpen: false, error: null }),

  login: async (email, password) => {
    if (!email || !password) {
      set({ error: 'Please fill in both email and password.' });
      return { success: false };
    }

    set({ isLoading: true, error: null });
    try {
      const res = await loginUser(email, password);
      get().setAuth(res.user, res.accessToken, res.refreshToken);
      set({ isLoading: false });
      return { success: true };
    } catch (err) {
      set({ isLoading: false, error: err.message || 'Login failed. Please check your credentials.' });
      return { success: false, message: err.message };
    }
  },

  register: async (fullName, email, password) => {
    if (!fullName || !email || !password) {
      set({ error: 'Please fill in all required fields.' });
      return { success: false };
    }

    set({ isLoading: true, error: null });
    try {
      const res = await registerUser(fullName, email, password);
      get().setAuth(res.user, res.accessToken, res.refreshToken);
      set({ isLoading: false });
      return { success: true };
    } catch (err) {
      set({ isLoading: false, error: err.message || 'Registration failed.' });
      return { success: false, message: err.message };
    }
  },

  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await updateUserProfile(profileData);
      localStorage.setItem('nb_user', JSON.stringify(updatedUser));
      set({ user: updatedUser, isLoading: false, isProfileModalOpen: false });
      return { success: true };
    } catch (err) {
      // Local optimistic update fallback if offline
      const currentUser = get().user || {};
      const newProfile = { ...currentUser, ...profileData };
      localStorage.setItem('nb_user', JSON.stringify(newProfile));
      set({ user: newProfile, isLoading: false, isProfileModalOpen: false });
      return { success: true };
    }
  },

  initAuth: async () => {
    const token = localStorage.getItem('nb_token');
    const refreshToken = localStorage.getItem('nb_refresh_token');
    if (!token && !refreshToken) return;

    try {
      const profile = await fetchUserProfile();
      set({ user: profile, isAuthenticated: true });
    } catch (err) {
      if (refreshToken) {
        try {
          const res = await refreshAuthToken(refreshToken);
          get().setAuth(res.user, res.accessToken, res.refreshToken);
        } catch {
          get().logout();
        }
      } else {
        get().logout();
      }
    }
  }
}));
