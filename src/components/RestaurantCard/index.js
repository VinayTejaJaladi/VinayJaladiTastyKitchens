import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantCard = props => {
  const {details} = props
  const {name, cuisine, userRating, imageUrl, id} = details
  const {rating, ratingColor, totalReviews} = userRating
  const color = {
    backgroundColor: {ratingColor},
  }

  return (
    <Link
      to={`restaurant/${id}`}
      testid="restaurant-item"
      className="restaurants-link-item"
    >
      <li className="card-container">
        <img src={imageUrl} className="restaurant-image" alt="restaurant" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="rating-container">
            <p>
              <AiFillStar className="star-icon" color={color} />
            </p>
            <p className="restaurant-rating">{rating}</p>
            <h1 className="restaurant-reviews-count">
              ({totalReviews} rating)
            </h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
