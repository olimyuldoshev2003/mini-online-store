import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllProducts,
  getCategories,
  getProductsForFiltering,
} from "../../api/api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";

//React icons
import { FaShoppingCart } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import { addProductIntoCart } from "../../reducers/cart";

const Home = () => {
  const dispatch = useAppDispatch();

  const dataOfProducts = useAppSelector(
    (state: any) => state.states.dataOfProducts
  );
  const loadingProducts = useAppSelector(
    (state: any) => state.states.loadingProducts
  );

  const dataOfProductsForGettingFilters = useAppSelector(
    (state: any) => state.states.dataOfProductsForGettingFilters
  );

  // const categories = useAppSelector((state) => state.states.categories)
  const dataProductsFromCart = useAppSelector(
    (state) => state.states.dataProductsFromCart
  );

  const [filterByBrand, setFilterByBrand] = useState<string>("");

  const uniqueBrands = dataOfProductsForGettingFilters?.products?.reduce(
    (acc: any, current: any) => {
      const x = acc.find((item: any) => item.brand === current.brand);
      if (!x) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  useEffect(() => {
    dispatch(getAllProducts(filterByBrand));
  }, [dispatch, filterByBrand]);

  useEffect(() => {
    dispatch(getProductsForFiltering());
  }, [dispatch]);

  return (
    <>
      <div className="home_page">
        <section className="section_1_swiper"></section>
        <section className="section_2 max-w-[1440px] m-[0_auto] px-[90px]">
          <div className="block_text_and_filter_by_price_brand_category flex justify-between">
            <h1 className="text-[20px] font-[500]">Products</h1>
            <div className="block_filters">
              <FormControl sx={{ width: 280 }}>
                <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterByBrand}
                  label="Brand"
                  onChange={(event: any) => {
                    setFilterByBrand(event.target.value);
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {uniqueBrands?.map((item: any) => {
                    return <MenuItem value={item.brand}>{item.brand}</MenuItem>;
                  })}

                  {/* <MenuItem value={20}>Twenty</MenuItem> */}
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="block_products flex flex-wrap justify-center gap-3 mt-[20px]">
            {loadingProducts ? (
              <div className="min-h-[71vh]">
                <Loader />
              </div>
            ) : (
              dataOfProducts?.products?.map((item: any) => {
                return (
                  <div key={item.id}>
                    <Card sx={{ width: 280, minHeight: 353, padding: `20px` }}>
                      <Link to={`/product/${item.id}`}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            sx={{
                              width: 190,
                              height: 180,
                              objectFit: `contain`,
                              textAlign: `center`,
                            }}
                            image={item.thumbnail}
                          />
                        </Box>
                        <Box sx={{ minHeight: 120 }}>
                          <CardContent
                            sx={{
                              display: `flex`,
                              flexDirection: `column`,
                              justifyContent: `center`,
                              alignItems: `start`,
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              sx={{
                                fontSize: `18px`,
                                textAlign: `center`,
                                maxWidth: `200px`,
                              }}
                            >
                              {item.price}$
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              sx={{
                                fontSize: `18px`,
                                textAlign: `center`,
                                maxWidth: `200px`,
                              }}
                            >
                              {item.title}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Link>
                      <CardActions
                        sx={{ display: "flex", justifyContent: `center` }}
                      >
                      </CardActions>
                        <Box sx={{ display: "flex", justifyContent: `center` }}>
                          {dataProductsFromCart?.find(
                            (el: { id: number; quantity: number }) =>
                              el.id === item.id
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
                                dispatch(
                                  addProductIntoCart({ ...item, quantity: 1 })
                                );
                              }}
                            >
                              <FaShoppingCart className="text-[20px]" />
                              Add to Card{" "}
                            </button>
                          )}
                        </Box>
                    </Card>
                  </div>
                );
              })
            )}
            {loadingProducts === false && dataOfProducts.limit === 0 && (
              <div className="min-h-[32vh]">
                <h1>Products not found</h1>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
