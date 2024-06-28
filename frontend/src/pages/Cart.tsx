import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem";
import { addToCart, calculatePrice, removeCartItem } from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const incrementHandler = (cartItem: CartItem) => {
    if(cartItem.quantity >= cartItem.stock) return toast.error(`Only ${cartItem.stock} items in stock`);
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if(cartItem.quantity <= 1) return
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId:string) => {
    dispatch(removeCartItem(productId))
  };

  useEffect(() => {

    axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`)
    .then((res)=>{
      setIsValidCouponCode(true);
      dispatch(calculatePrice())
    })
    .catch((err)=>{
      console.log(err.response.data.message)
      setIsValidCouponCode(false)
      dispatch(calculatePrice())
    })
  }, [couponCode,cartItems]);

  useEffect(()=>{
    dispatch(calculatePrice())
  },[cartItems])

  return (
    <>
    <div className="heading">
      {cartItems.length>0 && cartItems.length>1?(`${cartItems.length}  items in your cart`):(`${cartItems.length}  item in your cart`)}
    </div>
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          
          cartItems.map((i, index) => (
            <>
            
            <CartItemCard 
            incrementHandler={incrementHandler} 
            decrementHandler={decrementHandler}
            removeHandler={removeHandler}
            key={index} cartItem={i} />
            </>
          ))
        ) : (
          <h1>Your Cart is Empty</h1>
        )}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>
          Discount:<em className="red">- ₹{discount}</em>
        </p>
        <p>
          <b>Total : ₹{total}</b>
        </p>

        <input
          placeholder="Have a coupon code?"
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon Code <VscError />{" "}
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
    </>
  );
};

export default Cart;
