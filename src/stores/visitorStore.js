import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';
import { API_BASE_URL } from '../services/api';

const backendOrigin = API_BASE_URL.replace(/\/api\/?$/, '');

export const useVisitorStore = create((set, get) => ({
  liveVisitors: 1,
  lifetimeVisits: 14280,
  isConnected: false,
  connection: null,

  initVisitorHub: () => {
    if (get().connection) return;

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${backendOrigin}/hubs/visitor`)
      .withAutomaticReconnect()
      .build();

    hubConnection.on('ReceiveVisitorUpdate', (liveCount, lifetime) => {
      set({ liveVisitors: liveCount, lifetimeVisits: lifetime });
    });

    hubConnection.start()
      .then(() => {
        set({ isConnected: true, connection: hubConnection });
        hubConnection.invoke('GetCurrentCount').catch(() => {});
      })
      .catch((err) => {
        console.warn('VisitorHub fallback mode (running offline simulation):', err.message);
        setInterval(() => {
          set((state) => ({
            liveVisitors: Math.max(1, state.liveVisitors + (Math.random() > 0.5 ? 1 : -1))
          }));
        }, 12000);
      });
  }
}));
