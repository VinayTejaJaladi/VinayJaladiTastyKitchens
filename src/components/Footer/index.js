import {
  FaPinterestSquare,
  FaInstagram,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634478744/Frame_275footer_logo_aelvp2.svg"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-website-name">Tasty Kitchens</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. Contact us on.
      </p>
      <div className="social-buttons-container">
        <FaPinterestSquare
          className="social-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="social-icon" testid="instagram-social-icon" />
        <FaTwitter className="social-icon" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="social-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
