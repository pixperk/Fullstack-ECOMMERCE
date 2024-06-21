import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const addToCartHandler = () => {};
  
  const isPrevPage = page>1;
  const isNextPage = page<4;
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
            <option value="">Sample 1</option>
            <option value="">Sample 2</option>
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
        <div className="search-product-list">
          <ProductCard
            productId="kdofkd"
            name="Gucci Purse"
            price={250000}
            handler={addToCartHandler}
            stock={15}
            photo="https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1701970240/764961_FACU3_4047_006_100_0000_Light-Ophidia-mini-bag.jpg"
          />
        </div>
        <article>
          <button disabled={!isPrevPage} onClick={() => setPage((p) => p - 1)}>Prev</button>
          <span>
            {page} of {4}
          </span>

          <button disabled={!isNextPage} onClick={() => setPage((p) => p + 1)}>Next</button>
        </article>
      </main>
    </div>
  );
};

export default Search;
