import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import DishCard from '../DishCard'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class RestaurantItem extends Component {
  state = {
    isLoading: false,
    restaurantDetails: '',
    dishesList: [],
  }

  componentDidMount() {
    this.getDishesList()
  }

  getDishesList = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const dishesList = data.food_items.map(each => ({
        name: each.name,
        cost: each.cost,
        foodType: each.food_type,
        imageUrl: each.image_url,
        id: each.id,
        rating: each.rating,
      }))
      const updatedData = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
        foodItems: dishesList,
      }
      this.setState({
        restaurantDetails: updatedData,
        isLoading: false,
        dishesList,
      })
    } else {
      console.log(data.error_msg)
    }
  }

  renderRestaurantDetails = () => {
    const {restaurantDetails} = this.state
    const {
      rating,
      name,
      cuisine,
      location,
      costForTwo,
      imageUrl,
      reviewsCount,
    } = restaurantDetails

    return (
      <div className="restaurant-details">
        <img
          src={imageUrl}
          className="restaurant-item-image"
          alt="restaurant"
        />
        <div className="information-container">
          <h1 className="restaurant-item-name">{name}</h1>
          <p className="restaurant-item-cuisine">{cuisine}</p>
          <p className="restaurant-location">{location}</p>
          <div className="rating-cost-container">
            <div className="restaurant-rating-container">
              <div className="rating-number">
                <AiFillStar className="rating-icon" />
                <p className="restaurant-rating">{rating}</p>
              </div>
              <p className="reviews-count">{reviewsCount} Ratings</p>
            </div>
            <div className="cost-container">
              <div className="cost-rupee-icon">
                <BiRupee className="rupee-icon" />
                <p className="cost-for-two">{costForTwo}</p>
              </div>
              <p className="for-two">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderDishesList = () => {
    const {dishesList} = this.state

    return (
      <ul className="dishes-container">
        {dishesList.map(each => (
          <DishCard details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header currentRoute="home" />
        {isLoading ? (
          <div testid="restaurants-details-loader">
            <Loader type="Oval" color="#F7931E" height="50" width="50" />
          </div>
        ) : (
          <div className="restaurant-item-container">
            {this.renderRestaurantDetails()}
            {this.renderDishesList()}
          </div>
        )}
        <Footer />
      </>
    )
  }
}

export default RestaurantItem
