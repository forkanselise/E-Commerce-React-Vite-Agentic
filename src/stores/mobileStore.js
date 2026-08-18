import { create } from 'zustand';
import { fetchMobilePhonesApi } from '../services/mobileApi';

export const useMobileStore = create((set, get) => ({
  phones: [],
  totalCount: 0,
  totalPages: 0,
  page: 1,
  pageSize: 10,
  search: '',
  brand: '',
  isLoading: false,
  error: null,
  
  setFilters: (filters) => set((state) => ({ ...state, ...filters, page: 1 })),
  
  setPage: (page) => set({ page }),
  
  fetchPhones: async () => {
    set({ isLoading: true, error: null });
    try {
      const { page, pageSize, search, brand } = get();
      
      const data = await fetchMobilePhonesApi(page, pageSize, search, brand);
      
      // Map API fields to frontend UI expected fields
      const mappedPhones = (data.items || []).map(p => ({
        id: p.id,
        name: p.title || `${p.brand} ${p.model}`,
        brand: p.brand,
        model: p.model,
        price: p.price,
        image: p.imageUrl,
        description: `Premium ${p.brand} smartphone with high-end features.`,
        specs: {
          ram: p.ram,
          storage: p.storage,
          display: p.screenSize,
          processor: p.processor,
          battery: p.battery
        },
        stock: p.stock
      }));

      set({ 
        phones: mappedPhones, 
        totalCount: data.totalCount, 
        totalPages: data.totalPages,
        isLoading: false 
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));
