import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const PlaceOrder = () => {
  const clearLocalStorage = () => {
    const emptyList = []
    localStorage.setItem('cartData', JSON.stringify(emptyList))
  }
  return (
    <Popup
      modal
      trigger={
        <button type="button" className="place-order-button">
          Place Order
        </button>
      }
      className="popup-content"
    >
      {close => (
        <>
          <Header currentRoute="cart" />
          <div className="payment-bg-container">
            <div className="payment-container">
              <img
                src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634468688/Vectorsuccess_f7vm3h.jpg"
                className="success-image"
                alt="success"
              />
              <h1 className="success">Payment Successful</h1>
              <p className="payment-success">
                Thank you for ordering.
                <br /> Your payment is successfully completed.
              </p>
              <Link to="/" onClick={() => close()}>
                <button
                  type="button"
                  onClick={clearLocalStorage}
                  className="go-to-home"
                >
                  Go To Home Page
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </Popup>
  )
}

export default PlaceOrder
