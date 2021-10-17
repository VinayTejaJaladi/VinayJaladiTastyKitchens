import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {count: 0}

  componentDidMount() {
    const {number} = this.props
    this.setState({count: number})
  }

  onDecrement = () => {
    const {count} = this.state
    if (count === 1) {
      this.setState({count: 0}, this.updateCartData)
    } else {
      this.setState(
        prevState => ({count: prevState.count - 1}),
        this.updateCartData,
      )
    }
  }

  onIncrement = () => {
    this.setState(
      prevState => ({count: prevState.count + 1}),
      this.updateCartData,
    )
  }

  onClickAdd = () => {
    const {dish} = this.props
    let cartData = JSON.parse(localStorage.getItem('cartData'))
    if (cartData === null) {
      cartData = []
    }
    const itemDetails = {...dish, quantity: 1}
    cartData.push(itemDetails)
    console.log(cartData)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState({count: 1})
  }

  renderCartPage = () => {
    const {renderCart} = this.props
    if (renderCart !== 'undefined') {
      renderCart()
    }
  }

  updateCartData = () => {
    const {dish} = this.props
    const {count} = this.state
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    let updatedCartData = []
    if (count !== 0) {
      const itemDetails = {...dish, quantity: count}
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
    const {count} = this.state
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
        <div className="amount-container" testid={amount}>
          {count}
        </div>
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
    const {count} = this.state
    const showAdd = count === 0
    return <>{showAdd ? this.renderAddButton() : this.renderCounter()}</>
  }
}

export default Counter
