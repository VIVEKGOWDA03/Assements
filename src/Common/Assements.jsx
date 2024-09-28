import React, { useState, useEffect } from "react";
import { useGetCatsQuery } from "../store/AssesmentApi";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";
// Import your images from the public folder
const imageUrl = "/assets/cat.gif";
const errorimg = "/assets/404.avif";

const Assement = () => {
  const [page, setPage] = useState(1); // Track the current page number
  const [allCats, setAllCats] = useState([]); // Store all fetched cats
  const [hasMore, setHasMore] = useState(true); // Track if more images are available
  const { data: cats, error, isLoading, refetch } = useGetCatsQuery(page); // Fetch for the current page

  // Append new cats to the existing list whenever 'cats' updates
  useEffect(() => {
    if (cats && cats.length > 0) {
      setAllCats((prevCats) => [...prevCats, ...cats]);
    } else if (cats && cats.length === 0) {
      setHasMore(false); // No more data available
    }
  }, [cats]);

  // Infinite Scroll - Trigger next page load when near bottom
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight && hasMore
    ) {
      setPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  // Animation settings for loading images with Framer Motion
  const container = (delay) => ({
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: delay },
    },
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, [hasMore]);

  // Refetch images when all images are exhausted and the user tries to load more
  useEffect(() => {
    if (!hasMore) {
      const timeout = setTimeout(() => {
        refetch();
        setHasMore(true); // Allow refetch to get more images
      }, 3000); // Optional delay before refetching
      return () => clearTimeout(timeout);
    }
  }, [hasMore, refetch]);

  // Loading State for the initial page load
  if (isLoading && page === 1)
    return (
      <div className="w-full h-screen flex items-center justify-center text-[#002668]">
        <div>
          <motion.span
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="flex gap-2 justify-center items-center bg-gradient-to-r from-pink-300 via-slate-500 to-purple-400 bg-clip-text text-3xl tracking-tighter text-transparent"
          >
            <img src={imageUrl} alt="Loading..." />
          </motion.span>
        </div>
      </div>
    );

  // Error State
  if (error)
    return (
      <div className="flex flex-col items-center">
        <p className="text-white">Error: {error.message}</p>
        <img src={errorimg} alt="Error" />
        <button
          onClick={() => {
            refetch();
            setHasMore(true); // Reset to allow retry
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="w-full h-screen flex justify-center flex-col items-center">
      <motion.span
        variants={container(0.5)}
        initial="hidden"
        animate="visible"
        className="flex gap-2 bg-gradient-to-r from-pink-300 via-slate-500 to-purple-400 bg-clip-text text-7xl tracking-tighter text-transparent"
      >
        CAT IMAGES
      </motion.span>

      <div className="cat-images w-full flex flex-col items-center ">
        {/* Loop over allCats and display each cat image */}
        {allCats.map((cat) => (
          <motion.img
            key={cat.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="object-fill w-[440px] h-[440px] mb-2 rounded"
            src={cat.url}
            alt="Cat"
            // loading="lazy" 
          />
        ))}

        {/* Loading spinner when fetching more images */}
        {isLoading && page > 1 && (
          <div className="w-full flex justify-center items-center mt-4">
            <img src={imageUrl} alt="Loading..." className="w-12 h-12" />
          </div>
        )}

        {/* No more images available */}
        {!hasMore && (
          <div className="w-full flex justify-center items-center mt-4">
            <p className="text-white">No more cat images available.</p>
            {/* Optional retry button to refetch more */}
            <button
              onClick={() => {
                refetch();
                setHasMore(true); // Retry fetching more images
              }}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry Fetching
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assement;
