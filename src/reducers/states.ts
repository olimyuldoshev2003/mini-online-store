import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { getAllProducts,  getCategories, getProductsForFiltering, getSearchedProducts } from "../api/api";

// Define a type for the slice state

const initialState = {
  dataOfProductsForGettingFilters: [],
  categories: [],
  loadingCategories: false,
  dataOfProducts: [],
  loadingProducts: false,
  productsFromCategory: [],
  dataOfSearchedProducts: [],
  loadingSearchedProducts: false,
  dataProductsFromCart: [],
  loadingProductsFromCart: false,
};

export const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loadingCategories = true
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loadingCategories = false
      state.categories = action.payload
    })
    builder.addCase(getCategories.rejected, (state) => {
      state.loadingCategories = false
    })
    builder.addCase(getAllProducts.pending, (state) => {
      state.loadingProducts = true
    })
    builder.addCase(getAllProducts.fulfilled, (state,action) => {
      state.loadingProducts = false
      state.dataOfProducts = action.payload;
    })
    builder.addCase(getAllProducts.rejected, (state) => {
      state.loadingProducts = false
    })
    builder.addCase(getSearchedProducts.pending, (state) => {
      state.loadingSearchedProducts = true;
    });
    builder.addCase(getSearchedProducts.fulfilled, (state, action) => {
      state.loadingSearchedProducts = false;
      state.dataOfSearchedProducts = action.payload;
    });
    builder.addCase(getSearchedProducts.rejected, (state) => {
      state.loadingSearchedProducts = false;
    });
    builder.addCase(getProductsForFiltering.fulfilled, (state, action) => {
      state.dataOfProductsForGettingFilters = action.payload;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.states;
export const {} = statesSlice.actions;

export default statesSlice.reducer;
