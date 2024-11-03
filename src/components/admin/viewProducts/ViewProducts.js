import {deleteDoc,doc} from "firebase/firestore";
import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {db,storage} from "../../../firebase/config";
import styles from "./ViewProducts.module.scss";
import {FaEdit,FaTrashAlt} from "react-icons/fa";
import Loader from "../../loader/Loader";
import {deleteObject,ref} from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch,useSelector } from "react-redux";
import { selectProducts,STORE_PRODUCTS } from "../../../redux/slices/productSlice";
import {FILTER_BY_SEARCH,selectFilteredProducts} from "../../../redux/slices/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const ViewProduct=()=>{

    const [search,setSearch]=useState("");
    const {data,isLoading}=useFetchCollection("products");
    const products=useSelector(selectProducts);
    const filteredProducts=useSelector(selectFilteredProducts);
    const [currentPage,setCurrentPage]=useState(1);
    const [productsPerPage,setProductsPerPage]=useState(10);
    const indexOfLastProduct=currentPage*productsPerPage;
    const indexOfFirstProduct=indexOfLastProduct-productsPerPage;
    const currentProducts=filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct);
    const dispatch=useDispatch();
    
    useEffect(()=>{
        dispatch(
            dispatch({products:data,})
        );
    },[dispatch,data])

    useEffect(()=>{
        dispatch(FILTER_BY_SEARCH({products,search}));
    },[dispatch,products,search]);

    const confirmDelete=(id,imageURL)=>{
        Notiflix.Confirm.show(
            "Delete Product!!!",
            "You are about to delete this product",
            "Delete",
            "Cancel",
            function okCb(){
                deleteProduct(id,imageURL)
            },
            function cancelCb(){
                console.log("cancel call back function here")
            },
            {
                width:"320px",
                borderRadius: "3px",
                titleColor: "orangered",
                okButtonBackground:"orangeRed",
                cssAnimationStyle:"zoom",
            }
        );

        const deleteProduct=async(id,imageURL)=>{
            try{
                await deleteDoc(doc(db,"products",id));
                const storageRef=ref(storage,imageURL);
                await deleteObject(storageRef);

            }catch(err){
                toast.error(err.message)
            }
        };    
    }

    return (
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            <h2>All Products</h2>
    
            <div className={styles.search}>
              <p>
                <b>{filteredProducts.length}</b> products found
              </p>
              <Search value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
    
            {filteredProducts.length === 0 ? (
              <p>No product found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product, index) => {
                    const { id, name, price, imageURL, category } = product;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={imageURL}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{name}</td>
                        <td>{category}</td>
                        <td>{`$${price}`}</td>
                        <td className={styles.icons}>
                          <Link to={`/admin/add-product/${id}`}>
                            <FaEdit size={20} color="green" />
                          </Link>
                          &nbsp;
                          <FaTrashAlt
                            size={18}
                            color="red"
                            onClick={() => confirmDelete(id, imageURL)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length}
            />
          </div>
        </>
      );

}


export default ViewProduct;