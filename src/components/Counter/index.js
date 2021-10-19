import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {quantity: 0}

  componentDidMount() {
    const {dish} = this.props
    const {id} = dish
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    if (cartData !== null) {
      const thisDish = cartData.filter(each => each.id === id)
      if (thisDish.length !== 0) {
        this.setState({quantity: thisDish[0].count})
      }
    }
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity === 1) {
      this.setState({quantity: 0}, this.updateCartData)
    } else {
      this.setState(
        prevState => ({quantity: prevState.quantity - 1}),
        this.updateCartData,
      )
    }
  }

  onIncrement = () => {
    this.setState(
      prevState => ({quantity: prevState.quantity + 1}),
      this.updateCartData,
    )
  }

  onClickAdd = () => {
    const {dish} = this.props
    let cartData = JSON.parse(localStorage.getItem('cartData'))
    if (cartData === null) {
      cartData = []
    }
    const itemDetails = {...dish, count: 1}
    cartData.push(itemDetails)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState({quantity: 1})
  }

  renderCartPage = () => {
    const {renderCart} = this.props
    if (renderCart !== 'undefined') {
      renderCart()
    }
  }

  updateCartData = () => {
    const {dish} = this.props
    const {quantity} = this.state
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    let updatedCartData = []
    if (quantity !== 0) {
      const itemDetails = {...dish, count: quantity}
      const remainingItems = cartData.filter(each => each.id !== dish.id)
      updatedCartData = [...remainingItems, itemDetails]
    } else {
      const remainingItems = cartData.filter(each => each.id !== dish.id)
      updatedCartData = [...remainingItems]
    }
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.renderCartPage()
  }

  renderCounter = () => {
    const {quantity} = this.state
    const {minus, plus, amount} = this.props

    return (
      <div className="buttons-container">
        <button
          testid={minus}
          className="minus-button"
          type="button"
          onClick={this.onDecrement}
        >
          -
        </button>
        <p className="amount-container" testid={amount}>
          {quantity}
        </p>
        <button
          testid={plus}
          className="plus-button"
          type="button"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }

  renderAddButton = () => (
    <div className="add-button-container">
      <button type="button" className="add-button" onClick={this.onClickAdd}>
        Add
      </button>
    </div>
  )

  render() {
    const {quantity} = this.state
    const showAdd = quantity === 0
    return (
      <div className="add-remove">
        {showAdd ? this.renderAddButton() : this.renderCounter()}
      </div>
    )
  }
}

export default Counter
