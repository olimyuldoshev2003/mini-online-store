import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IProduct } from "../../Types/types";
import { decrement, delProductInCard, increment } from "../../reducers/cart";
import { Link } from "react-router-dom";


//Material UI Component
import { Button } from "@mui/material";

//Material IU Icon
import DeleteIcon from "@mui/icons-material/Delete";
import { FaShoppingCart } from "react-icons/fa";

//React Icons


const Cart = () => {
  const dispatch = useAppDispatch();

  // States from redux
  const dataProductsFromCart = useAppSelector(
    (state: any) => state.cart.dataProductsFromCart
  );

  let total = 0;
  for (let i = 0; i < dataProductsFromCart.length; i++) {
    total +=
      (dataProductsFromCart[i].price -
        (dataProductsFromCart[i].price *
          dataProductsFromCart[i].discountPercentage) /
          100) *
      dataProductsFromCart[i].quantity;
  }

  return (
    <>
      <div className="p-5 max-w-[1440px] m-[0_auto] px-[90px]">
        <h1 className="text-[25px] font-[500]">Cart</h1>
      </div>
      <div className="min-h-[50vh] flex flex-col items-start justify-between px-5 h-full gap-y-5 lg:flex-row">
        {dataProductsFromCart.length > 0 ? (
          <>
            <div className="w-full">
              <table className="w-full border">
                <thead className="border">
                  <tr>
                    <th className="text-center w-[30%]">Product</th>
                    <th className="text-center w-[10%]">Price</th>
                    <th className="text-center w-[10%]">Quantity</th>
                    <th className="text-center w-[10%]">Total</th>
                    <th className="text-center w-[10%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataProductsFromCart?.map((el: IProduct) => {
                    return (
                      <tr key={el.id} className="lg:min-h-[50px]">
                        <td className="flex items-center flex-col sm:flex-row gap-x-5 min-h-[50px]">
                          <picture className="hidden sm:block">
                            <img
                              src={el.thumbnail}
                              alt=""
                              className="w-[120px] h-[80px] object-contain"
                            />
                          </picture>
                          {el.title}
                        </td>
                        <td className="text-center">
                          {(
                            el.price -
                            (el.price * el.discountPercentage) / 100
                          ).toFixed(2)}{" "}
                          $
                        </td>
                        <td className="px-2">
                          <div className="flex mx-auto items-center justify-center bg-blue-500 rounded-xl py-[10px] gap-[14px]">
                            <Button
                              onClick={() => dispatch(decrement(el.id))}
                              variant="contained"
                              color="error"
                              disabled={el.quantity == 1}
                              className="w-[20px] h-10 flex items-center justify-center text-[18px]"
                            >
                              -
                            </Button>
                            <h1 className="text-white">{el.quantity}</h1>
                            <Button
                              onClick={() => dispatch(increment(el.id))}
                              variant="contained"
                              color="success"
                              disabled={el.quantity == el.stock}
                              className="w-[20px] h-10 flex items-center justify-center text-[18px]"
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="text-center">
                          {(
                            (el.price -
                              (el.price * el.discountPercentage) / 100) *
                            el.quantity
                          ).toFixed(2)}{" "}
                          $
                        </td>
                        <td>
                          <Button
                            variant="contained"
                            onClick={() => dispatch(delProductInCard(el.id))}
                            className="w-[10px] px-5 bg-white shadow-none flex items-center justify-center"
                          >
                            <DeleteIcon />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-full lg:w-[400px] p-5 bg-gray-200 rounded-lg">
              <h1 className="text-gray-500">
                Quantity of products:{" "}
                {dataProductsFromCart.reduce(
                  (a: number, b: IProduct) => a + b.quantity,
                  0
                )}
              </h1>
              <h1 className="text-[16px]">
                Preliminary sum: {total.toFixed(2)} $
              </h1>
              <h1 className="text-[18px] font-[700]">
                Total : {total.toFixed(2)} $
              </h1>
              <div className="pt-5">
                <Button
                  variant="contained"
                  color="success"
                  className=" text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center">
              <FaShoppingCart className="text-[100px] sm:text-[150px] text-gray-400" />
              <h1 className="text-center text-[23px] sm:text-[30px] py-5">
                Products in cart aren't found
              </h1>
              <Link to={"/"}>
                <Button
                    variant="contained"
                    color="error"
                  className="bg-[#ffda46] text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Go Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
