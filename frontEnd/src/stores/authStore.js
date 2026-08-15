import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('nb_token') || null,
  isAuthenticated: !!localStorage.getItem('nb_token'),
  isAuthModalOpen: false,

  setAuth: (user, token) => {
    localStorage.setItem('nb_token', token);
    set({ user, token, isAuthenticated: true, isAuthModalOpen: false });
  },

  logout: () => {
    localStorage.removeItem('nb_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  // Demo Switcher for fast evaluation
  loginDemo: (role) => {
    let mockUser = {
      id: 'demo_user_1',
      fullName: 'Sarah Baker',
      email: 'sarah@nexusbakery.com',
      role: 'User',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      subscription: { tier: 'MasterclassPro', isActive: true }
    };

    if (role === 'Admin') {
      mockUser = {
        id: 'demo_admin_1',
        fullName: 'Chef Rahim (Admin)',
        email: 'admin@nexusbakery.com',
        role: 'Admin',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        subscription: { tier: 'MasterclassPro', isActive: true }
      };
    } else if (role === 'SystemAdmin') {
      mockUser = {
        id: 'demo_sysadmin_1',
        fullName: 'System Super Admin',
        email: 'sysadmin@nexusbakery.com',
        role: 'SystemAdmin',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        subscription: { tier: 'VipBakerPass', isActive: true }
      };
    }

    const mockToken = 'mock_jwt_token_' + role;
    get().setAuth(mockUser, mockToken);
  }
}));
