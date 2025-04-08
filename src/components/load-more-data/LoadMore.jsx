import React, { useEffect, useState } from "react";

function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [disable, setDisable] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      let response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      if (!response.ok) {
        throw new Error("Oops! Error occurred, can't fetch the data...");
      }
      response = await response.json();

      if (response && response.products && response.products.length) {
        setProducts((prevData) => [...prevData, ...response.products]);
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [count]);

  const loadMore = () => {
    setCount((prevCount) => prevCount + 1);
    if (count === 5) {
      setDisable(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(products);

  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="group relative border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className="w-full h-64 overflow-hidden">
                <img
                  className="w-full h-full object-contain bg-gray-500"
                  src={product.images[0]}
                  alt={product.title}
                />
              </div>

              <div className="p-4 flex flex-col h-full">
                <h3 className="h-16 text-lg font-semibold text-gray-800 mb-2">
                  {product.title}
                </h3>

                <p className="text-xl font-bold text-gray-900">
                  ${product.price}
                </p>

                <p className="text-sm text-yellow-500 mt-1">
                  Rating: {product.rating}
                </p>

                <button className="bg-blue-600 text-white py-2 mt-2 rounded-lg buttom w-full">
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={loadMore}
          className={`p-1 rounded text-2xl ${
            disable ? "bg-gray-500" : "bg-gray-900"
          } text-white m-5 text-center`}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default LoadMore;
