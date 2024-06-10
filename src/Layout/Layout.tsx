import React, { useEffect, useRef, useState } from "react";
import "./Layout.css";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCategories, getSearchedProducts } from "../api/api";

//Material icons
import SearchIcon from "@mui/icons-material/Search";

// React icons
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

//For Images
import logoHeader from "../assets/Online-Store.png";
import Loader from "../components/Loader/Loader";
import { Footer } from "../components/Footer/Footer";

const Layout = () => {
  const dispatch = useAppDispatch();
  const closeModalCategories = useRef<any>();
  const closeModalSearch = useRef<any>();
  const [modalCategories, setModalCategories] = useState<boolean>(false);
  const [modalSearch, setModalSearch] = useState<boolean>(false);
  const [searchInpValue, setSearchInpValue] = useState<string>("");

  // States from redux
  const categories = useAppSelector((state: any) => state.states.categories);
  const loadingCategories = useAppSelector(
    (state: any) => state.states.loadingCategories
  );

  const dataOfSearchedProducts = useAppSelector(
    (state: any) => state.states.dataOfSearchedProducts
  );
  const loadingSearchedProducts = useAppSelector(
    (state: any) => state.states.loadingSearchedProducts
  );

  const dataProductsFromCart = useAppSelector(
    (state: any) => state.cart.dataProductsFromCart
  );



  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSearchedProducts(searchInpValue));
  }, [dispatch, searchInpValue]);

  return (
    <>
      <div className="main_block">
        <header className="header px-[60px]">
          <div className="block_header max-w-[1440px] m-[0_auto] flex justify-between items-center py-[20px]">
            <div className="logo_block">
              <Link className="text-[21px] font-[600]" to={`/`}>
                {/* Store */}
                <img
                  src={logoHeader}
                  className="w-[90px] h-[61px]"
                  alt="online-store"
                />
              </Link>
            </div>
            <nav className="navbar">
              <ul>
                <li>
                  <div className="block_for_hover flex flex-col justify-center items-center w-max">
                    <button
                      className="btn_categories text-[17px] p-[5px_10px] rounded-[5px] bg-[#dad7d7] hover:bg-[#d1d0d0] font-[600] flex items-center gap-2 outline-none"
                      onClick={() => {
                        setModalCategories(!modalCategories);
                      }}
                    >
                      {modalCategories ? (
                        <IoMdClose className="text-[23px]" />
                      ) : (
                        <IoMenu className="text-[23px]" />
                      )}
                      Catalog
                    </button>

                    {modalCategories ? (
                      <div
                        className="block_for_outside_modal absolute top-0 left-0 w-[100%] min-h-[100vh]"
                        ref={closeModalCategories}
                        onClick={(
                          event: React.MouseEvent<HTMLDivElement, MouseEvent>
                        ) => {
                          if (event.target === closeModalCategories.current) {
                            setModalCategories(false);
                          }
                        }}
                      >
                        <div
                          className={`block_categories grid grid-cols-3 p-[8px_10px] rounded-[5px] gap-[10px] shadow-2xl bg-[#fff] mt-[10px] absolute top-[63px] z-50 left-[33.7%] max-w-[500px] h-[300px] overflow-auto`}
                        >
                          {loadingCategories ? (
                            <div>
                              <Loader />
                            </div>
                          ) : (
                            categories?.map((item: any, index: number) => {
                              return (
                                <div key={index}>
                                  <Link
                                    to={`/category/${item.slug}`}
                                    className="text-[15px] font-[400] hover:font-[500] hover:underline"
                                    onClick={() => {
                                      setModalCategories(false);
                                    }}
                                  >
                                    {item.name}
                                  </Link>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </li>
              </ul>
            </nav>
            <div className="block_search_input_and_cart flex items-center gap-2">
              {/* <input
                type="search"
                name=""
                id=""
                className="outline-none border-[2px] border-[#e6e4e4] p-[5px_8px] rounded-[5px] placeholder:text-[gray] text-[15px] "
                placeholder="Search..."
                onFocus={() => {
                  setModalSearch(!modalSearch);
                }}
                
              /> */}

              <SearchIcon className="cursor-pointer" onClick={() => {
                  setModalSearch(!modalSearch);
                }}/>
              {modalSearch ? (
                <div
                  className="w-[100%] min-h-[100vh] absolute top-0 left-0 z-50 bg-[#d3d3d311] flex justify-center items-center"
                  ref={closeModalSearch}
                  onClick={(
                    event: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => {
                    if (event.target === closeModalSearch.current) {
                      setModalSearch(false);
                    }
                  }}
                >
                  <div className=" bg-[#fff] h-[300px] w-[300px] rounded-[5px] overflow-auto p-[10px_20px]">
                    <div className="header flex justify-between items-center">
                      <h1>Search Products</h1>
                      <button
                        className="text-[30px]"
                        onClick={() => {
                          setModalSearch(false);
                        }}
                      >
                        &times;
                      </button>
                    </div>
                    <div className="mt-[20px]">
                      <input
                        type="search"
                        value={searchInpValue}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setSearchInpValue(event.target.value);
                        }}
                        name=""
                        id=""
                        className="outline-none border-[2px] border-[#e6e4e4] p-[5px_8px] rounded-[5px] placeholder:text-[gray] text-[15px] w-[100%]"
                        placeholder="Search Products"
                      />
                      {/* <button className="bg-[#dad7d7] hover:bg-[#d1d0d0] font-[600] p-[5px_20px] rounded-[5px] cursor-pointer h-[36px]">
                        Search
                      </button> */}
                    </div>
                    <div className="block_searched_and_loading_products mt-[20px]">
                      {searchInpValue === "" ? (
                        <div className="">
                          <h1>Search your favorite product</h1>
                        </div>
                      ) : (
                        <div>
                          {loadingSearchedProducts ? (
                            <div>
                              <Loader />
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1">
                              <div className="block_text">
                                {dataOfSearchedProducts.limit === 0 ? (
                                  <div>{searchInpValue} not found</div>
                                ) : (
                                  <div>
                                    <h1>
                                      Found {dataOfSearchedProducts.limit}{" "}
                                      product
                                      {dataOfSearchedProducts.limit !== 1 &&
                                        `s`}
                                    </h1>
                                  </div>
                                )}
                              </div>
                              <div className="block_each_searced_products flex flex-col gap-1 mt-[10px]">
                                {dataOfSearchedProducts?.products?.map(
                                  (item: any) => {
                                    return (
                                      <Link
                                        to={`/product/${item.id}`}
                                        onClick={() => {
                                          setModalSearch(false);
                                          setSearchInpValue("");
                                        }}
                                        className="p-[5px_5px] bg-[wheat] hover:bg-[#ececec] rounded-[5px]"
                                      >
                                        <div key={item.id}>
                                          <h1>{item.title}</h1>
                                        </div>
                                      </Link>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
              <Link to={`/cart`}>
                <button className="bg-[#000] font-[600] p-[5px_10px] rounded-[5px] cursor-pointer h-[36px] relative">
                  <div className="absolute bg-[red]  text-[#fff] text-[11px] rounded-full p-[2px] top-[-10px] right-[-5px]">{ dataProductsFromCart.length}</div>
                  <FaShoppingCart className="text-[18px] text-[#fff]" />
                </button>
              </Link>
            </div>
          </div>
        </header>
        <Outlet />
        <Footer/>
      </div>
    </>
  );
};

export default Layout;
