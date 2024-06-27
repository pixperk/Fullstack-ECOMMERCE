import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery();

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchData,
    isError: isProductError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const addToCartHandler = () => {};

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  if (isProductError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {loadingCategories === false ? (
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))
            ) : (
              <Skeleton length={2} />
            )}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="search-product-list">
            {searchData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                handler={addToCartHandler}
                stock={i.stock}
                photo={i.photo}
              />
            ))}
          </div>
        )}

        {searchData && searchData?.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchData.totalPage}
            </span>

            <button
              disabled={!isNextPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
