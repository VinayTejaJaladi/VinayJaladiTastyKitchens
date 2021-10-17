import Slider from 'react-slick'
import './index.css'

const OffersLanding = props => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const {offersList} = props
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {offersList.map(each => (
          <div className="image-container" key={each.id}>
            <img src={each.imageUrl} className="offers-image" alt="offer" />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default OffersLanding
