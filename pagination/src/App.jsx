import React, { useEffect, useState } from 'react'

export default function App() {
   const [products, setProducts] = useState([])
   const [page, setPage] = useState(1);

   const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
    }
    console.log(data);
  }

  useEffect(() => {
    fetchProducts();
  }, [])


  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
      setPage(selectedPage)
    }
  }


  return (
    <div>
      {
        products.length >0 ? (
          <div style={{ padding: '20px', color: '#333' }}>
            <h1>Products</h1>
            <ul>
              {products.slice(page * 10 - 10, page * 10).map(product => (
                <li key={product.id}>
                  <h2>{product.title}</h2>
                  <img src={product.thumbnail} alt={product.title} style={{ width: '100px', height: '100px' }} />
                  <p>Category: {product.category}</p>
                  <p>Brand: {product.brand}</p>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                </li>
              ))}
            </ul>
            {
              products.length > 0 && (
                <div className="pagination">
               <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>
                  {
                    [...Array(products.length / 10)].map((_, index) => {
                      return <span key={index} className={page === index + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(index + 1)}>{index + 1}</span>
                    })
                  }
                  <span onClick={() => selectPageHandler(page + 1)} className={page < products.length / 10 ? "" : "pagination__disable"}>▶</span>
                </div>
              )
            }
          </div>
        ) : (
          <div style={{ padding: '20px', color: '#333' }}>
            <h1>No Products</h1>
          </div>
        )
      }
    </div>
  )
}
