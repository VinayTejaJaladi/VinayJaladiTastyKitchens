import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFilterLeft} from 'react-icons/bs'
import {AiOutlineRightSquare, AiOutlineLeftSquare} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import OffersLanding from '../OffersLanding'
import RestaurantCard from '../RestaurantCard'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

class Home extends Component {
  state = {
    isOffersLoading: false,
    isRestaurantsLoading: false,
    offersDetails: [],
    restaurantsDetails: [],
    searchInput: '',
    sortInput: 'Lowest',
    currentPage: 1,
    totalPages: 0,
  }

  componentDidMount() {
    this.getOffersDetails()
    this.getRestaurantsDetails()
  }

  getOffersDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({isOffersLoading: true})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.offers.map(each => ({
        imageUrl: each.image_url,
        id: each.id,
      }))
      this.setState({isOffersLoading: false, offersDetails: updatedData})
    } else {
      console.log(data.error_msg)
    }
  }

  getRestaurantsDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({isRestaurantsLoading: true})
    const {searchInput, currentPage, sortInput} = this.state
    const offset = (currentPage - 1) * 9
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=9&sort_by_rating=${sortInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.restaurants.map(each => ({
        hasOnlineDelivery: each.has_online_delivery,
        userRating: {
          ratingText: each.user_rating.rating_text,
          ratingColor: each.user_rating.rating_color,
          totalReviews: each.user_rating.total_reviews,
          rating: each.user_rating.rating,
        },
        name: each.name,
        hasTableBooking: each.has_table_booking,
        isDeliveringNow: each.is_delivering_now,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        id: each.id,
        menuType: each.menu_type,
        location: each.location,
        opensAt: each.opens_at,
        groupByTime: each.group_by_time,
      }))
      const totalPages = Math.ceil(data.total / 9)
      this.setState({
        restaurantsDetails: updatedData,
        isRestaurantsLoading: false,
        totalPages,
      })
    } else {
      console.log(data.error_msg)
    }
  }

  onClickLeftButton = () => {
    const {currentPage} = this.state
    if (currentPage !== 1) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
        }),
        this.getRestaurantsDetails,
      )
    }
  }

  onClickRightButton = () => {
    const {totalPages, currentPage} = this.state
    if (currentPage !== totalPages) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1,
        }),
        this.getRestaurantsDetails,
      )
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value, currentPage: 1})
  }

  onPressSearchInput = event => {
    if (event.key === 'Enter') {
      this.getRestaurantsDetails()
    }
  }

  onChangeSortInput = event => {
    this.setState(
      {sortInput: event.target.value, currentPage: 1},
      this.getRestaurantsDetails,
    )
  }

  renderOffersLanding = () => {
    const {isOffersLoading, offersDetails} = this.state
    return (
      <>
        {isOffersLoading ? (
          <div
            className="offers-loader-container"
            testid="restaurants-offers-loader"
          >
            <Loader type="Oval" color="#F7931E" height="50" width="50" />
          </div>
        ) : (
          <div className="offers-container">
            <OffersLanding offersList={offersDetails} />
          </div>
        )}
      </>
    )
  }

  renderRestaurantsLanding = () => {
    const {
      isRestaurantsLoading,
      sortInput,
      searchInput,
      restaurantsDetails,
      currentPage,
      totalPages,
    } = this.state
    return (
      <>
        {isRestaurantsLoading ? (
          <div
            className="restaurants-loader-container"
            testid="restaurants-list-loader"
          >
            <Loader type="Oval" color="#F7931E" height="50" width="50" />
          </div>
        ) : (
          <div className="restaurants-container">
            <div className="filters-container">
              <div className="static-part">
                <h1 className="popular-heading">Popular Restaurants</h1>
                <p className="popular-description">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
              </div>
              <div className="search-container">
                <BiSearch color="#64748b" className="search-icon" />
                <input
                  type="search"
                  className="search-input-field"
                  onChange={this.onChangeSearchInput}
                  onKeyPress={this.onPressSearchInput}
                  placeholder="Search Restaurants"
                  value={searchInput}
                />
              </div>
              <div className="sort-by-container">
                <BsFilterLeft color="#475569" />
                <p className="sort-by">Sort By</p>
                <select
                  value={sortInput}
                  className="sort-container"
                  onChange={this.onChangeSortInput}
                >
                  <option value="Lowest" key="0" className="option-low" checked>
                    Lowest
                  </option>
                  <option value="Highest" className="option-high" key="2">
                    Highest
                  </option>
                </select>
              </div>
            </div>
            <ul className="results-container">
              {restaurantsDetails.map(each => (
                <RestaurantCard key={each.id} details={each} />
              ))}
            </ul>
            <div className="pagination-container">
              <button
                type="button"
                testid="pagination-left-button"
                className="left-button"
                onClick={this.onClickLeftButton}
              >
                <AiOutlineLeftSquare className="left-icon" />
              </button>
              <p
                className="pagination-current-page"
                testid="active-page-number"
              >
                {currentPage}
              </p>
              <p className="pagination-total-pages">of {totalPages}</p>
              <button
                type="button"
                testid="pagination-right-button"
                className="right-button"
                onClick={this.onClickRightButton}
              >
                <AiOutlineRightSquare className="right-icon" />
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  render() {
    return (
      <>
        <Header currentRoute="home" />
        <div className="home-page-bg">
          {this.renderOffersLanding()}
          {this.renderRestaurantsLanding()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
