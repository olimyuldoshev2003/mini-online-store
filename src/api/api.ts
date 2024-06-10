import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsForFiltering = createAsyncThunk(
  "api/GetBrands",
  async function () {
    try {
      const { data } = await axios.get(`https://dummyjson.com/products`);

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "api/GetAllProducts",
  async function (q: string) {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${q}&`
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const getCategories = createAsyncThunk(
  "api/getCategories",
  async function () {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/categories`
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

// export const getProductsByCategory = createAsyncThunk("", async function () {
//   try {
//     const { data } = await axios.get(
//       `https://dummyjson.com/products/categories`
//     );

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// });

export const getSearchedProducts = createAsyncThunk(
  "api/GetSearchedProducts",
  async function (q: string) {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${q}`
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

// export const getProductsFromCart = createAsyncThunk(
//   "api/getProductsFromCart",
//   async function () {
//     try {
//       const { data } = await axios.get(`https://dummyjson.com/carts`);

//       return data;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );
