import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import Counter from '../Counter'
import PlaceOrder from '../PlaceOrder'

import './index.css'

class Cart extends Component {
  state = {cartData: []}

  componentDidMount() {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    this.setState({cartData})
  }

  reRenderCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    this.setState({cartData})
  }

  calculateTotal = () => {
    const {cartData} = this.state
    const totalPrices = cartData.map(each => {
      const items = each.quantity
      const price = each.cost
      return items * price
    })
    const total = totalPrices.reduce((acc, cur) => acc + cur, 0)
    return total
  }

  renderCartPage = () => {
    const {cartData} = this.state
    return (
      <>
        <Header currentRoute="cart" />
        <div className="cart-container">
          <ul className="cart-items-list">
            <li key="titles-row" className="list-headings">
              <p className="item-heading">Item</p>
              <p className="quantity-heading">Quantity</p>
              <p className="price-heading">Price</p>
            </li>
            {cartData.map(each => (
              <li key={each.id} className="cart-list-item">
                <div className="img-name-container">
                  <img
                    src={each.imageUrl}
                    alt="dish item"
                    className="cart-dish-image"
                  />
                  <p className="cart-dish-name">{each.name}</p>
                </div>
                <div className="counter-container">
                  <Counter
                    dish={each}
                    minus="decrement-quantity"
                    plus="increment-quantity"
                    amount="item-quantity"
                    number={each.quantity}
                    renderCart={this.reRenderCart}
                  />
                </div>
                <div className="price-container">
                  <BiRupee color="#F7931E" />
                  <p testid="total-price" className="price">
                    {each.quantity * each.cost}
                  </p>
                </div>
              </li>
            ))}
            <li key="order-total" className="order-total">
              <p className="heading">Order Total: </p>
              <p className="total-price">
                <BiRupee />
                <>{this.calculateTotal()}</>
              </p>
            </li>
            <li key="place-order" className="place-order-item">
              <PlaceOrder />
            </li>
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderEmptyView = () => (
    <>
      <Header currentRoute="cart" />
      <div className="empty-view-container">
        <img
          src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634409095/cooking_1emptyview_fv5tlg.jpg"
          alt="empty cart"
          className="empty-cart-img"
        />
        <h1 className="no-orders">No Order Yet!</h1>
        <p className="no-orders-para">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button type="button" className="order-now">
            Order Now
          </button>
        </Link>
      </div>
    </>
  )

  render() {
    const {cartData} = this.state
    const emptyView = cartData === null || cartData.length === 0
    console.log(cartData)
    return <>{emptyView ? this.renderEmptyView() : this.renderCartPage()}</>
  }
}

export default Cart