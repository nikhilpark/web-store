import React,{useEffect,useState} from 'react'
import Products from '../Products/Products'
import Axios from 'axios'
import Pagination  from './Pagination/Pagination'

import './ProductsPage.scss'

export default function Home() {
    const [products, setProducts] = useState([]);
    const [api, setApi] = useState("");
    const [loading,setLoading] = useState(false)
    const [currentPage,setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);


    useEffect(() => {
        Axios.get("/products/view")
          .then((res) => {
            setProducts(res.data);
            setApi('done');
            
          })
      }, [api]);
    
      const indexOfLastProduct = currentPage * productsPerPage
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0)
    }

    return (
        <>
        <div id="grid">
            <Products products={currentProducts} loading={loading} />
        </div>
        <Pagination productsPerPage={productsPerPage} currentPage={currentPage} totalProducts={products.length} paginate={paginate}/> 
        </>
    )
}
