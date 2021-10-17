import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Counter from '../Counter'
import './index.css'

const DishCard = props => {
  const {details} = props
  const {name, cost, rating, imageUrl} = details

  return (
    <li testid="foodItem" className="dish-card">
      <img src={imageUrl} className="food-item-image" alt="food item" />
      <div className="dish-item-details">
        <h1 className="item-name">{name}</h1>
        <div className="price-container">
          <BiRupee />
          <p className="dish-price">{cost}</p>
        </div>
        <div className="dish-rating-container">
          <AiFillStar color="#FFCC00" />
          <p className="dish-rating">{rating}</p>
        </div>
        <div className="counter-container">
          <Counter
            dish={details}
            minus="decrement-count"
            plus="increment-count"
            amount="active-count"
            number={0}
            renderCart="undefined"
          />
        </div>
      </div>
    </li>
  )
}

export default DishCard
