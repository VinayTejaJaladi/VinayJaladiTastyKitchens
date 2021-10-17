import Header from '../Header'
import './index.css'

const NotFound = props => {
  const onClickHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <>
      <Header currentRoute="home" />
      <div className="not-found-container">
        <img
          src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634222415/erroring_1not-found_vyccrk.jpg"
          alt="not found"
          className="not-found-img"
        />
        <p className="page-not-found">Page Not Found</p>
        <p className="description">
          we are sorry, the page you requested could not be found
        </p>
        <p className="description-2">Please go back to the homepage</p>
        <button type="button" onClick={onClickHome} className="home-button">
          Home Page
        </button>
      </div>
    </>
  )
}

export default NotFound
