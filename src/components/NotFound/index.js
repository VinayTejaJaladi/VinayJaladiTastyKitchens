import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header currentRoute="home" />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634222415/erroring_1not-found_vyccrk.jpg"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="page-not-found">Page Not Found</h1>
      <p className="description">
        we are sorry, the page you requested could not be found
      </p>
      <p className="description-2">Please go back to the homepage</p>
      <Link to="/">
        <button type="button" className="home-button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
