import React, { useEffect, useState } from "react";
import { useGetCatsQuery } from "../store/AssesmentApi";
import Simmer from "./Simmer";

const LIMIT = 5;

const Assement = () => {
  const [page, setPage] = useState(1);
  const [cats, setCats] = useState([]);
  const { data, error, isLoading } = useGetCatsQuery({ limit: LIMIT, page });
  const imageUrl = "./assets/cat.gif";
  const errorImg = "./assets/404.avif";

  useEffect(() => {
    if (data) {
      setCats((prev) => [...prev, ...data]);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center">
        <Simmer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error loading cats: {error.message}
        <img src={errorImg} alt="Error" />
      </div>
    );
  }

  const isFetchingMore = isLoading && page > 1;

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold w-full h-[40px] font-inter text-[#ffff] rounded bg-custom-gradient sticky mb-4 flex justify-center">
        My Cats
      </h1>

      {cats.length === 0 ? (
        <div>
          <Simmer />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {cats.map((cat) => (
            <div
              className="rounded-lg overflow-hidden shadow-md w-72 m-2"
              key={cat.id}
            >
              <img className="w-full h-auto" src={cat.url} alt="A cute cat" />
            </div>
          ))}
          {isFetchingMore && (
            <div className="w-72 m-2">
              <Simmer />
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleLoadMore}
        disabled={isLoading}
        className={`mt-4 px-4 py-2 rounded bg-blue-500 text-white flex justify-center items-center ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default Assement;
