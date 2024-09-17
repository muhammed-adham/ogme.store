import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://ogme.store/api",
  // baseURL: "http://localhost:8000/",
  withCredentials: true,
});
export const request = ({ ...option }) => {
  // axiosConfig.defaults.headers.common.Authorization = "Bearer token";
  axiosConfig.defaults.headers.common.Accept = "application/json";
  axiosConfig.defaults.headers.common["Content-Type"] =
    "application/x-www-form-urlencoded";
  const onSuccess = (res) => res;
  const onError = (err) => err;
  return axiosConfig(option).then(onSuccess).catch(onError);
};

//========================================================================================Products
//Get Products By Category
export const getCategoryProducts = async (
  category,
  limit,
  skipState,
  onSale,
  sold
) => {
  return await request({
    url: `/product?_s=${skipState}&_l=${limit}${
      category ? `&category=Ogme ${category}` : ""
    }${onSale ? `&_sale.onSale=${onSale}` : ""}
    ${sold ? `&sold=${sold}` : ""}
    `,
  });
};

//Get Single Product
export const getSingleProduct = async (id) => {
  return await request({ url: `/product?name=${id}` });
};

//Get All Products => Admin Panel
export const getAllProducts = async () => {
  return await request({ url: "/product" });
};

//Add Product
export const addProducts = async (data) => {
  return await request({ url: "/product", method: "post", data });
};

//Delete Product
export const deleteProduct = async (id) => {
  return await request({ url: `/product/${id}`, method: "delete" });
};

//Update Product
export const updateProduct = async (id, data) => {
  return await request({ url: `/product/${id}`, method: "post", data });
};

//========================================================================================File => for products Images
//Get Product Images
export const getProductImages = async (id) => {
  return await request({ url: `file?itemID=${id}` });
};

//Add Product Image
export const addProductImages = async (data) => {
  return await request({ url: `file`, method: "post", data });
};

//Get FeatureImage
export const getFeatureImage = async (name) => {
  return await request({ url: `file?itemName=${name}` });
};

//Update Product Image
export const updateProductImages = async (id, data) => {
  return await request({ url: `file/${id}`, method: "post", data });
};

//Delete Product Image
export const deleteProductImages = async (id) => {
  return await request({ url: `file/${id}`, method: "delete" });
};

//========================================================================================User
//Register
export const postNewUser = async (userData) => {
  return await request({ url: "/user", method: "post", data: userData });
};

//LOGIN
export const axiosLoginUser = async (userData) => {
  return await request({ url: "/user/login", method: "post", data: userData });
};

//LogOut
export const axiosLogoutUser = async (userData) => {
  return await request({ url: "/user/logout" });
};

//profile
export const GetUserProfile = async () => {
  return await request({
    url: `user/profile`,
    method: "get",
  });
};

//Update User
export const updateUserData = async (data) => {
  return await request({
    url: `user/${data._id}`,
    method: "post",
    data: data,
  });
};

//Verify Email
export const verifyUserEmail = async (id, token) => {
  return await request({ url: `user/verify/${id}/${token}` });
};

//Reset Password
export const resetPassword = async (email) => {
  return await request({
    url: "user/reset-password",
    method: "post",
    data: email,
  });
};

//Verify Reset Token
export const verifyResetToken = async (id, token) => {
  return await request({ url: `user/reset-password/${id}/${token}` });
};

//update Password
export const updatePassword = async (data) => {
  await request({
    url: `user/update-password`,
    method: "post",
    data,
  });
};
//========================================================================================Cartlist
//Add Product
export const postProductToCart = async (data) => {
  return await request({
    url: "/cart",
    method: "post",
    data,
  });
};

//Update item
export const updateCartProduct = async (data) => {
  return await request({
    url: `cart/${data._id}`,
    method: "post",
    data: data,
  });
};

//Delete Item
export const removeProductCart = async (id) => {
  return await request({ url: `cart/${id}`, method: "delete" });
};

//Get All Items => Admin Panel
export const getCartlistProducts = async () => {
  return await request({ url: `cart` });
};

//========================================================================================Orders
//Add Order
export const postUserOrder = async (data) => {
  return await request({
    url: "order",
    method: "post",
    data,
  });
};

//Get All Orders => Admin Panel
export const getAllOrders = async () => {
  return await request({ url: `order` });
};

//Update Order State
export const updateOrderState = async (id, state) => {
  return await request({ url: `order/${id}?state=${state}` });
};

//Delete Order
export const deleteOrder = async (id) => {
  return await request({ url: `order/${id}`, method: "delete" });
};

//========================================================================================Email
export const askUsEmail = async (data) => {
  return await request({ url: "mail", method: "post", data });
};

//========================================================================================Admin
//Get All Users
export const getUser = async (id) => {
  return await request({ url: `user?_id=${id}`, method: "get" });
};

//Get Categories
export const getBanner = async () => {
  return await request({ url: `category` });
};

export const updateBanner = async (id, url) => {
  return await request({
    url: `category/${id}`,
    method: "post",
    data: { bannerURL: url },
  });
};
//Get All Products
//Get All Orders
//Get All Cart Items
