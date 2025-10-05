import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  return await categoryService.getCategories();
});

export const addCategoryAsync = createAsyncThunk('categories/add', async (category) => {
  return await categoryService.addCategory(category);
});

export const removeCategoryAsync = createAsyncThunk('categories/remove', async (id) => {
  await categoryService.removeCategory(id);
  return id;
});

export const updateCategoryAsync = createAsyncThunk('categories/update', async (category) => {
  return await categoryService.updateCategory(category);
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchCategories.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(addCategoryAsync.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(removeCategoryAsync.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((c) => c.id !== payload);
      })
      .addCase(updateCategoryAsync.fulfilled, (state, { payload }) => {
        state.items = state.items.map((c) => (c.id === payload.id ? payload : c));
      });
  },
});

export const categoriesReducer = categorySlice.reducer;
export const selectCategories = (state) => state.categories?.items || [];
export const selectCategoriesLoading = (state) => state.categories?.loading || false;

export default categorySlice;
