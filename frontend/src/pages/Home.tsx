import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery();

  const dispatch = useDispatch()

  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock < 1) return toast.error(`${cartItem.name}is currently OUT OF STOCK`)

      dispatch(addToCart(cartItem))
      toast.success(`${cartItem.name} Added to Cart`)

  };

  if (isError) toast.error("Cannot Fetch Latest Products");

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="80vw"/>
        ) : (
          data?.products.map((i) => (
            <ProductCard
              productId={i._id}
              name={i.name}
              price={i.price}
              handler={addToCartHandler}
              stock={i.stock}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
