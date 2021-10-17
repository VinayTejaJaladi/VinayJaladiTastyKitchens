import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {currentRoute} = props

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="navbar-content">
        <Link to="/" className="link-container">
          <div className="header-logo-container">
            <img
              src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634219946/Frame_274_mbnkbw.jpg"
              className="header-website-logo"
              alt="website logo"
            />
            <h1 className="header-website-name">Tasty Kitchens</h1>
          </div>
        </Link>
        <div className="menu-button-container">
          <ul className="nav-menu">
            <Link to="/" className="link-container">
              <li
                className={`navbar-home ${
                  currentRoute === 'home' && 'home-true'
                }`}
              >
                Home
              </li>
            </Link>
            <Link to="/cart" className="link-container">
              <li
                className={`navbar-cart ${
                  currentRoute === 'cart' && 'cart-true'
                }`}
              >
                Cart
              </li>
            </Link>
          </ul>
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
