import React, { useEffect, useState } from "react";

function ImageSlider({ url, limit = 5, page = 1 }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchImages(url) {
    try {
      const response = await fetch(`${url}?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      setError(error.message);
    }
  }

  function slideLeft() {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  }

  function slideRight() {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  }

  function moveToImage(index) {
    setCurrentImage(index);
  }

  useEffect(() => {
    if (url) {
      fetchImages(url);
    }
    setLoading(false);
  }, [url, page, limit]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center text-xl text-red-600">Oops! {error}</div>
    );
  }

  return (
    <div className="w-full max-w-2xl h-96 relative flex items-center justify-center overflow-hidden rounded-xl shadow-lg bg-gray-900">
      <button
        onClick={() => slideLeft()}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-75 text-white hover:bg-opacity-90 p-3 rounded-full transition-all ease-in-out duration-300"
      >
        {"<"}
      </button>
      <div className="w-full h-full transition-all duration-500 ease-in-out">
        {images &&
          images.length &&
          images.map((imageData, index) => {
            return currentImage === index ? (
              <div key={index}>
                <img
                  src={imageData.download_url}
                  alt={imageData.download_url}
                  className="w-full h-full rounded-lg object-cover opacity-100 transition-opacity duration-500 ease-in-out"
                />
              </div>
            ) : null;
          })}
      </div>
      <button
        onClick={() => slideRight()}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-75 text-white hover:bg-opacity-90 p-3 rounded-full transition-all ease-in-out duration-300"
      >
        {">"}
      </button>
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images &&
          images.length &&
          images.map((_, index) => (
            <button
              key={index}
              onClick={() => moveToImage(index)}
              className={`${
                index === currentImage
                  ? "bg-white w-4 h-4 transform scale-110"
                  : "bg-gray-600 w-4 h-4"
              } rounded-full transition-all duration-300 ease-in-out`}
            ></button>
          ))}
      </div>
    </div>
  );
}

export default ImageSlider;