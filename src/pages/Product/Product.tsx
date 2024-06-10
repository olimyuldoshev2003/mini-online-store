import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../../components/Loader/Loader";

//React Icons
import { FaShoppingCart } from "react-icons/fa";
import { addProductIntoCart } from "../../reducers/cart";
// import { IProduct } from "../../Types/types";

const Product = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<any>([]);
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);

  const dataProductsFromCart = useAppSelector(
    (state: any) => state.cart.dataProductsFromCart
  );

  async function getProductById() {
    try {
      setLoadingProduct(true);
      const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProduct(false);
    }
  }

  useEffect(() => {
    getProductById();
  }, [id]);

  return (
    <>
      <div className="page_each_product max-w-[1440px] m-[0_auto] ">
        {loadingProduct ? (
          <div className="min-h-[71vh] flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="block_product flex justify-center gap-[10px] flex-wrap">
            <div className="block_image">
              <img src={product.thumbnail} className="w-[400px]" alt="" />
            </div>
            <div className="block_informations">
              <h1 className="text-[24px] font-[500]">{product.title}</h1>
              <h1 className="mt-[20px] text-[23px]">{product.price}$</h1>
              <div className="block_about_products mt-[20px] flex flex-col gap-2">
                <h2 className="text-[18px]">
                  <span className="font-[600]">Brand: </span> {product.brand}
                </h2>
                <h2 className="text-[18px]">
                  <span className="font-[600]">Availability Status: </span>{" "}
                  {product.availabilityStatus}
                </h2>
                <h2 className="text-[18px]">
                  <span className="font-[600]">Discount Percentage: </span>{" "}
                  {product.discountPercentage}%
                </h2>

                <p className="max-w-[400px] text-[16px]">
                  <span className="font-[600]">Description: </span>{" "}
                  {product.description}
                </p>
              </div>
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: `20px`
              }}>
                {dataProductsFromCart?.find(
                  (el: { id: number; quantity: number }) => el.id === product.id
                ) ? (
                  <Link to={`/cart`}>
                    <button className="flex justify-center items-center gap-[10px] text-[18px] bg-[#dad7d7] hover:bg-[#d1d0d0] font-[600] p-[5px_10px] rounded-[5px]">
                      <FaShoppingCart className="text-[20px]" />
                      Go to Card{" "}
                    </button>
                  </Link>
                ) : (
                  <button
                    className="flex justify-center items-center gap-[10px] text-[18px] bg-[#dad7d7] hover:bg-[#d1d0d0] font-[600] p-[5px_10px] rounded-[5px]"
                    onClick={() => {
                      dispatch(addProductIntoCart({ ...product, quantity: 1 }));
                    }}
                  >
                    <FaShoppingCart className="text-[20px]" />
                    Add to Card{" "}
                  </button>
                )}
              </Box>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
