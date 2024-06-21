import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";


const cartItems = [
  {
    productId: "dsnsjkdjkfds",
    photo:
      "https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1701970240/764961_FACU3_4047_006_100_0000_Light-Ophidia-mini-bag.jpg",
    name: "Gucci Purse",
    price: 250000,
    quantity: 2,
    stock: 3,
  },
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.1);
const shippingCharges = 833;
const discount = 49;
const total = subtotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    if (Math.random() > 0.5) {
      setIsValidCouponCode(true);
    } else setIsValidCouponCode(false);
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, index) => <CartItem key={index} cartItem={i} />)
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
  );
};

export default Cart;
