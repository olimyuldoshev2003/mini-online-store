import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { IProduct } from "../Types/types";
import { message } from "antd";

// Define a type for the slice state

const storage: string | null = localStorage.getItem("cart");
export const cartSlice: any = createSlice({
  name: "cart",
  initialState: storage
    ? JSON.parse(storage)
    : {
        dataProductsFromCart: [],
      },
  reducers: {
    addProductIntoCart: (state, action) => {
      if (
        !state.dataProductsFromCart.find(
          (item: IProduct) => item.id == action.payload.id
        )
      ) {
        state.dataProductsFromCart.push(action.payload);
        localStorage.setItem(
          "cart",
          JSON.stringify({
            dataProductsFromCart: state.dataProductsFromCart,
          })
          );
          message.success("Product Sucessfully added to cart")
      }
    },
    delProductInCard: (state, action) => {
      state.dataProductsFromCart = state.dataProductsFromCart.filter(
        (item: IProduct) => item.id !== action.payload
      );
      localStorage.setItem(
        "cart",
        JSON.stringify({
          dataProductsFromCart: state.dataProductsFromCart,
        })
      );
    },
    increment: (state, action) => {
      state.dataProductsFromCart.find((item: IProduct) => item.id == action.payload)
        .quantity++;
      localStorage.setItem(
        "cart",
        JSON.stringify({
          dataProductsFromCart: state.dataProductsFromCart,
        })
      );
    },
    decrement: (state, action) => {
      state.dataProductsFromCart.find((item: IProduct) => item.id == action.payload)
        .quantity--;
      localStorage.setItem(
        "cart",
        JSON.stringify({
          dataProductsFromCart: state.dataProductsFromCart,
        })
      );
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cart;
export const { addProductIntoCart, delProductInCard, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
