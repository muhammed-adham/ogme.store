import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  addProductImages,
  addProducts,
  deleteProduct,
  deleteProductImages,
  getCategoryProducts,
  getProductImages,
  updateProduct,
} from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";

const AdminProducts = () => {
  const [productsState, setProductsState] = useState();

  //Query Filters
  const [categoryState, setCategoryState] = useState(null);
  const [isOnSale, setIsOnSale] = useState(null);
  const [termState, setTermState] = useState("");

  //Fetch Data
  const { refetch, isLoading } = useQuery(
    ["ogmeDrive", categoryState, isOnSale],
    () => getCategoryProducts(categoryState, "", "", isOnSale),
    {
      onSuccess: (data) => {
        setProductsState(data?.data?.response?.data);
      },
    }
  );

  //Add Product State
  const [inputState, setInputState] = useState({
    productName: "",
    category: "",
    brief: "",
    featureImage: "",
    price: 0,
    onSale: false,
    salePrice: 0,
    productImages: [{ productImage_$: "" }],
  });

  //================================================================Handlers
  const inputHandler = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  //Add Handler
  const submitHandler = (e) => {
    e.preventDefault();
    const {
      productName,
      category,
      brief,
      featureImage,
      price,
      onSale,
      salePrice,
      productImage_2,
      productImage_3,
    } = inputState;

    const data = {
      name: productName,
      category,
      brief,
      featureImage,
      price,
      _sale: { onSale, price: salePrice },
    };
    addProducts(data).then((res) => {
      if (res.data.status === 500) {
        toast.error(res.data.message);
      } else {
        refetch();
        const itemID = res?.data?.data._id;

        const data1 = {
          fullPath: featureImage,
          fileName: `${productName.split(" ").join("-")}-1`,
          itemID,
          itemName: productName,
          fileType: "image",
        };
        const data2 = {
          fullPath: productImage_2,
          fileName: `${productName.split(" ").join("-")}-2`,
          itemID,
          itemName: productName,
          fileType: "image",
        };
        const data3 = {
          fullPath: productImage_3,
          fileName: `${productName.split(" ").join("-")}-3`,
          itemID,
          itemName: productName,
          fileType: "image",
        };
        addProductImages(data1);
        addProductImages(data2);
        addProductImages(data3);

        setInputState({
          productName: "",
          category: "",
          brief: "",
          featureImage: "",
          price: 0,
          onSale: false,
          salePrice: 0,
          productImage_2: "",
          productImage_3: "",
        });

        toast.success("Added Successuflly");
      }
    });
  };

  //Delete Handler
  const deleteHandler = (id) => {
    deleteProduct(id).then(() => {
      getProductImages(id).then((res) => {
        res?.data?.response?.data?.map((el) => {
          deleteProductImages(el._id).then((res) => {
            if (res?.data?.status === 200) {
              setInputState({
                ...inputState,
                productImage_2: "",
                productImage_3: "",
              });
            } else {
              toast.error("something went wrong!");
            }
          });
        });
      });
      refetch();
      toast.success("Deleted Successuflly");
    });
  };

  //Update Handler
  const [isUpdating, setIsUpdating] = useState(false);

  const updateHandler = (idx) => {
    setIsUpdating(true);

    scroll({ left: 0, top: 300, behavior: "smooth" });

    const target = productsState[productsState?.length - idx - 1];

    getProductImages(target._id).then((res) => {
      const data = res?.data?.response?.data;

      setInputState({
        id: target._id,
        productName: target.name,
        category: target.category,
        brief: target.brief,
        featureImage: target.featureImage,
        price: target.price,
        onSale: target._sale.onSale,
        salePrice: target._sale.price,

        productImages: [
          ...data.map((item, index) => ({
            [`productImage_${index + 2}`]: item?.fullPath || "",
          })),
        ],
      });
    });
  };

  //Submit Update Handler
  const sumbitUpdate = () => {
    const {
      id,
      productName,
      category,
      brief,
      featureImage,
      price,
      onSale,
      salePrice,
      productImage_2,
      productImage_3,
    } = inputState;

    const data = {
      name: productName,
      category,
      brief,
      featureImage,
      price,
      _sale: { onSale, price: salePrice },
    };

    updateProduct(id, data).then((res) => {
      if (res.data.status === 500) {
        toast.error(res.data.message);
      } else {
        const data1 = {
          fullPath: featureImage,
          fileName: `${productName.split(" ").join("-")}-1`,
          itemID: inputState?.id,
          itemName: productName,
          fileType: "image",
        };
        addProductImages(data1);

        if (!inputState?.productImage_2 == "") {
          const data2 = {
            fullPath: productImage_2,
            fileName: `${productName.split(" ").join("-")}-2`,
            itemID: inputState?.id,
            itemName: productName,
            fileType: "image",
          };

          addProductImages(data2);
        }

        if (!inputState?.productImage_3 == "") {
          const data3 = {
            fullPath: productImage_3,
            fileName: `${productName.split(" ").join("-")}-3`,
            itemID: inputState?.id,
            itemName: productName,
            fileType: "image",
          };

          addProductImages(data3);
        }

        refetch();

        setInputState({
          productName: "",
          category: "",
          brief: "",
          featureImage: "",
          price: 0,
          onSale: false,
          salePrice: 0,
          productImage_2: "",
          productImage_3: "",
        });

        setIsUpdating(false);

        toast.success("Added Successuflly");
      }
    });
  };

  //Submit Update Handler
  const clearImagesHandler = () => {
    getProductImages(inputState.id).then((res) => {
      res?.data?.response?.data?.map((el) => {
        deleteProductImages(el._id).then((res) => {
          if (res?.data?.status === 200) {
            toast.success(res?.data.message);
            setInputState({
              ...inputState,
              productImage_2: "",
              productImage_3: "",
            });
          } else {
            toast.error("something went wrong!");
          }
        });
      });
    });
  };

  //Search Handler
  //Search By Category
  const categorySearchHandler = (e) => {
    setCategoryState(e.target.value);
  };

  //Find On Sale
  const onSaleHandler = (e) => {
    setIsOnSale(e.target.value);
  };

  //Search By Name
  const searchHandler = (e) => {
    setTermState(e.target.value);
  };

  return (
    <>
      <div className="admin-products">
        <section className="admin-panel ">
          <h1 className="header">Add Product</h1>
          <form className="form-product" action="" method="post">
            <div className="form-group">
              <label htmlFor="productName">product name</label>
              <input
                onInput={inputHandler}
                value={inputState?.productName}
                type="text"
                id="productName"
                name="productName"
              />
            </div>

            <div className="form-group">
              <label>category name</label>
              <select
                // defaultValue={""}
                name="category"
                id="category"
                onInput={inputHandler}
                value={inputState?.category}
              >
                <option value="" disabled hidden>
                  Select Category...
                </option>
                <option value="Ogme drive">drive</option>
                <option value="Ogme bottles">bottles</option>
                <option value="Ogme glassware">glassware</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brief">brief</label>
              <input
                onInput={inputHandler}
                value={inputState?.brief}
                type="text"
                id="brief"
                name="brief"
              />
            </div>

            <div className="form-group">
              <label>product price</label>
              <input
                onInput={inputHandler}
                value={inputState?.price}
                type="number"
                id="price"
                name="price"
              />
            </div>

            <div className="form-group">
              <label>On Sale</label>
              <select
                name="onSale"
                id="onSale"
                onInput={inputHandler}
                value={inputState?.onSale}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="salePrice">Sale price</label>
              <input
                onInput={inputHandler}
                value={inputState?.salePrice}
                type="number"
                id="salePrice"
                name="salePrice"
              />
            </div>

            <div className="form-group">
              <label htmlFor="featureImage">feature image</label>
              <input
                onInput={inputHandler}
                value={inputState?.featureImage}
                type="url"
                id="featureImage"
                name="featureImage"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-images">product images</label>
              {inputState?.productImages?.map((el, idx) => {
                return (
                  <input
                    onInput={inputHandler}
                    value={el[`productImage_${idx + 2}`] || ""}
                    type="url"
                    id={`productImage_${idx + 2}`}
                    name={`productImage_${idx + 2}`}
                    placeholder="URL"
                  />
                );
              })}
              {/* <input
                onInput={inputHandler}
                value={inputState.productImage_2}
                type="url"
                id="productImage_2"
                name="productImage_2"
                placeholder="Shadow Self"
              />
              <input
                onInput={inputHandler}
                value={inputState.productImage_3}
                type="url"
                id="productImage_3"
                name="productImage_3"
                placeholder="Car View"
              /> */}
              {isUpdating ? (
                <>
                  <span className="warning-info">
                    <CiWarning />
                    For changing Product Images you must clear them first!
                  </span>
                  <div className="btn-clear" onClick={clearImagesHandler}>
                    clear product images
                  </div>
                </>
              ) : null}
            </div>
            {isUpdating ? (
              <div className="btn-submit" onClick={sumbitUpdate}>
                Update Product
              </div>
            ) : (
              <div className="btn-submit" onClick={submitHandler}>
                Add Product
              </div>
            )}
          </form>
        </section>
        <h1 className="header" style={{ paddingTop: "3rem" }}>
          Update Product
        </h1>

        <div className="search-section">
          <div className="form-group" style={{ width: "100%" }}>
            <select
              defaultValue={""}
              name="category-search"
              id="category-search"
              onInput={categorySearchHandler}
            >
              <option value="" disabled>
                Search by Category...
              </option>
              <option value="">All</option>
              <option value="drive">drive</option>
              <option value="bottles">bottles</option>
              <option value="glassware">glassware</option>
            </select>
          </div>

          <div className="form-group" style={{ width: "100%" }}>
            <select
              defaultValue={""}
              name="onSale-search"
              id="onSale-search"
              onInput={onSaleHandler}
            >
              <option value="" disabled>
                Find On Sale...
              </option>
              <option value="">All</option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search by name..."
            onInput={searchHandler}
          />
        </div>
        {isLoading ? (
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              height: "12rem",
              marginTop: "4rem",
            }}
          >
            Loading...
          </h1>
        ) : (
          <table className="admin-panel">
            <thead>
              <tr>
                <th>#</th>
                <th style={{ width: "8rem" }}>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Sale</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {productsState?.toReversed().map((prd, idx) => {
                const {
                  _id,
                  name,
                  category,
                  price,
                  _sale: { onSale, price: salePrice },
                } = prd;
                if (prd.name.includes(termState)) {
                  return (
                    <tr key={idx}>
                      <td>{productsState?.length - idx}</td>
                      <td style={{ width: "8rem" }}>{name}</td>
                      <td>{category.split(" ")[1]}</td>
                      <td>{onSale ? salePrice : price}</td>
                      <td>{onSale ? <b>Active</b> : "Inactive"}</td>
                      <td>
                        <div
                          className="btn btn-update"
                          onClick={() => updateHandler(idx)}
                        >
                          Update
                        </div>
                      </td>
                      <td>
                        <div
                          className="btn btn-delete"
                          onClick={() => deleteHandler(_id)}
                        >
                          Delete
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminProducts;
