import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  addProductImages,
  addProducts,
  deleteProduct,
  deleteProductImages,
  getCategoryProducts,
  getFeatureImage,
  getProductImages,
  updateProduct,
  updateProductImages,
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
    productImages: [
      { productImage_$: "" },
      { productImage_$: "" },
      { productImage_$: "" },
      { productImage_$: "" },
      { productImage_$: "" },
      { productImage_$: "" },
      { productImage_$: "" },
      { productImage_$: "" },
    ],
  });

  //================================================================Handlers
  const inputHandler = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  // Input handler
  const subInputHandler = (e) => {
    const { name, value } = e.target;
    const [parentKey, index] = name.split(".");
    

    setInputState((prevState) => {
      const updatedProductImages = [...prevState[parentKey]];
      updatedProductImages[index] = {
        ...updatedProductImages[index],
        [`productImage_${parseInt(index)}`]: value,
      };

      return {
        ...prevState,
        [parentKey]: updatedProductImages,
      };
    });
  };


  //Add Handler
  const submitHandler = (e) => {
    e.preventDefault();
    scroll({ left: 0, top: 300, behavior: "smooth" });
    toast.loading("saving", { duration: 1000 });

    const {
      productName,
      category,
      brief,
      featureImage,
      price,
      onSale,
      salePrice,
      productImages,
    } = inputState;

    const data = {
      name: productName,
      category,
      brief,
      featureImage,
      price,
      _sale: { onSale, price: salePrice },
    };

    //Add product to data base
    addProducts(data).then((res) => {
      if (res.data.status === 500) {
        toast.error(res.data.message);
        //if success
      } else {
        //default data for product images
        const baseData = {
          itemID: res?.data?.data?._id,
          itemName: productName,
          fileType: "image",
        };

        // Add main image same feature image of the product
        const mainImage = {
          fullPath: featureImage,
          fileName: `${productName.toLowerCase().split(" ").join("-")}-1`,
          ...baseData,
        };
        addProductImages(mainImage);

        // Iterate over productImages and add non-empty images
        productImages.forEach((image, idx) => {
          const imageKey = `productImage_${idx}`;

          if (image[imageKey]) {
            const data = {
              fullPath: image[imageKey],
              fileName: `${productName.toLowerCase().split(" ").join("-")}-${idx + 1}`,
              ...baseData,
            };
            addProductImages(data);
          }
        });

        refetch();

        setInputState({
          productName: "",
          category: "",
          brief: "",
          featureImage: "",
          price: 0,
          onSale: false,
          salePrice: 0,
          productImages: Array(9).fill({}),
        });

        toast.success("Added Successfully");
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
              cancelHandler()
            } else {
              toast.error("something went wrong!");
            }
          });
        });
      });
      refetch();
      toast.success("Deleted Successfully");
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

        productImages: Array.from({ length: 9 }, (_, index) => ({
          [`productImage_${index}`]: data[index]?.fullPath || "",
        })),
      });
    });
  };

  //Submit Update Handler
  const submitUpdate = () => {
    scroll({ left: 0, top: 300, behavior: "smooth" });

    const {
      id,
      productName,
      category,
      brief,
      featureImage,
      price,
      onSale,
      salePrice,
      productImages,
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
        const baseData = {
          itemID: id,
          itemName: productName,
          fileType: "image",
        };
        // Add main image same feature image of the product
        const mainImage = {
          fullPath: featureImage,
          fileName: `${productName.toLowerCase().split(" ").join("-")}-1`,
          ...baseData,
        };
        addProductImages(mainImage);

        // Iterate over productImages and add non-empty images
        productImages.forEach((image, idx) => {
          const imageKey = `productImage_${idx}`;

          if (image[imageKey]) {
            const data = {
              fullPath: image[imageKey],
              fileName: `${productName.toLowerCase().split(" ").join("-")}-${idx + 1}`,
              ...baseData,
            };
            addProductImages(data);
          }
        });

        refetch();

        // Reset input state
        setInputState({
          productName: "",
          category: "",
          brief: "",
          featureImage: "",
          price: 0,
          onSale: false,
          salePrice: 0,
          productImages: Array(9).fill({}), // Reset productImages to an array of empty objects
        });

        setIsUpdating(false);

        toast.success("Added Successfully");
      }
    });
  };

  // Cancel Btn Handler
  const cancelHandler = () => {
    scroll({ left: 0, top: 300, behavior: "smooth" });

    refetch();

    // Reset input state
    setInputState({
      productName: "",
      category: "",
      brief: "",
      featureImage: "",
      price: 0,
      onSale: false,
      salePrice: 0,
      productImages: Array(9).fill({}), // Reset productImages to an array of empty objects
    });

    setIsUpdating(false);
  };

  //Submit Update Handler
  const clearImagesHandler = () => {
    getProductImages(inputState.id).then((res) => {
      const images = res?.data?.response?.data;

      if (images && images.length > 0) {
        const deletePromises = images.map((el) => {
          return deleteProductImages(el._id).then((res) => {
            if (res?.data?.status === 200) {
            } else {
              toast.error("Something went wrong!");
            }
          });
        });

        // Wait for all delete promises to resolve
        Promise.all(deletePromises).then(() => {
          // Clear images in the input state, keeping the first one
          const clearedImages = [
            // images[0], // Keep the first image
            ...Array(9).fill({}), // Clear the remaining images
          ];

          setInputState((prevState) => ({
            ...prevState,
            productImages: clearedImages,
          }));

          toast.success("Images cleared successfully");
        });
      } else if (images && images.length === 1) {
        toast("no additional images to delete.", { icon: "⚠️" });
      } else {
        toast.success("No images to delete.");
      }
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
              {isUpdating ? (
                <>
                  <span className="warning-info">
                    <CiWarning />
                    For changing any of Product Images you must clear all first!
                  </span>
                  <div className="btn-clear" onClick={clearImagesHandler}>
                    {/* <CiWarning /> */}
                    clear all images
                  </div>
                </>
              ) : null}
              {inputState?.productImages?.map((el, idx) => {
                return (
                  <input
                    // disabled={idx === 0 ? true : false}
                    className={`${idx === 0 ? "disabled-input-image" : null}`}
                    key={idx}
                    onInput={subInputHandler}
                    value={
                      idx === 0
                        ? inputState?.featureImage
                        : el[`productImage_${idx}`] || ""
                    }
                    type="url"
                    id={`productImage_${idx}`}
                    name={`productImages.${idx}`}
                    placeholder={idx===0?"This will be the same provided feature image by default":"URL"}
                  />
                );
              })}

            </div>
            {isUpdating ? (
              <>
                <div className="btn-submit" onClick={submitUpdate}>
                  Update Product
                </div>
                <div className="btn btn-cancel" onClick={cancelHandler}>
                  Cancel
                </div>
              </>
            ) : (
              <>
              <div className="btn-submit" onClick={submitHandler}>
                Add Product
              </div>
              <div className="btn btn-cancel" onClick={cancelHandler}>
                  Clear
                </div>
              </>
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
