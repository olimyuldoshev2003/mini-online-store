import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";

const Category = () => {
  const { id } = useParams();

  const [productsByCategory, setProductsByCategory] = useState<any>([]);
  const [loadingProductsByCategory, setLoadingProductsByCategory] =
    useState<boolean>(false);

  async function getProductsByCategory() {
    try {
      setLoadingProductsByCategory(true);
      const { data } = await axios.get(
        `https://dummyjson.com/products/category/${id}`
      );
      setProductsByCategory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProductsByCategory(false);
    }
  }

  useEffect(() => {
    getProductsByCategory();
  }, [id]);

  return (
    <>
      <div className="page_products_by_category">
        <section className="section_1 max-w-[1440px] m-[0_auto]">
          {productsByCategory.limit === 0 ? (
            <div>
              <h1 className="text-[20px] text-center font-[500]">
                In the category {id} products not found
              </h1>
            </div>
          ) : (
            <div></div>
          )}
          <h1 className="text-[20px] text-center font-[500]">
            Found {productsByCategory.limit} products in the category "{id}"
          </h1>
          <div className="block_products flex flex-wrap justify-center gap-3 mt-[20px]">
            {loadingProductsByCategory ? (
              <div className="min-h-[71vh]">
                <Loader />
              </div>
            ) : (
              productsByCategory?.products?.map((item: any) => {
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
                        <Box sx={{ display: "flex", justifyContent: `center` }}>
                          <button className="flex justify-center items-center gap-[10px] text-[18px] bg-[#dad7d7] hover:bg-[#d1d0d0] font-[600] p-[5px_10px] rounded-[5px]">
                            <FaShoppingCart className="text-[20px]" />
                            Add to Card{" "}
                          </button>
                        </Box>
                        {/* <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button> */}
                      </CardActions>
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Category;
