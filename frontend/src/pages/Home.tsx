import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

const Home = () => {

  const addToCartHandler = ()=>{}
  return (
    <div className="home">
      <section></section>
      <h1>Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>

      <main>
        <ProductCard productId="kdofkd" name="Gucci Purse" price={250000} handler={addToCartHandler} stock={15} photo="https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1701970240/764961_FACU3_4047_006_100_0000_Light-Ophidia-mini-bag.jpg"/>
      </main>
    </div>
  )
}

export default Home