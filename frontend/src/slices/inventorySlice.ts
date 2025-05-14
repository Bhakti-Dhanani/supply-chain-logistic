import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../utils/api';

export interface Product {
  id: number;
  name: string;
  stockQuantity: number;
}

interface InventoryState {
  products: Product[];
  loading: boolean;
  error: string | null;
  editId: number | null;
  editStock: number;
}

const initialState: InventoryState = {
  products: [],
  loading: false,
  error: null,
  editId: null,
  editStock: 0,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'inventory/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await api.get('/products');
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProductStock = createAsyncThunk<
  { id: number; stockQuantity: number },
  { id: number; stockQuantity: number },
  { rejectValue: string }
>(
  'inventory/updateProductStock',
  async ({ id, stockQuantity }, { rejectWithValue }) => {
    try {
      await api.put(`/products/${id}/stock`, { stockQuantity });
      return { id, stockQuantity };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'inventory/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setEditId(state, action: PayloadAction<number | null>) {
      state.editId = action.payload;
    },
    setEditStock(state, action: PayloadAction<number>) {
      state.editStock = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        const { id, stockQuantity } = action.payload;
        const product = state.products.find(p => p.id === id);
        if (product) product.stockQuantity = stockQuantity;
        state.editId = null;
      })
      .addCase(updateProductStock.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setEditId, setEditStock } = inventorySlice.actions;
export default inventorySlice.reducer;
