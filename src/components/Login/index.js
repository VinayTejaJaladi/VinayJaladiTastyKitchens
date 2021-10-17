import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    this.setState({showError: false})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showError: true})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginPage = () => {
    const {username, password, showError} = this.state
    return (
      <div className="bg-container">
        <div className="login-form-bg-container">
          <div className="login-form-container">
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634219946/Frame_274_mbnkbw.jpg"
                className="website-logo"
                alt="website logo"
              />
              <h1 className="website-name">Tasty Kitchens</h1>
            </div>
            <h1 className="login-heading">Login</h1>
            <form className="form-container" onSubmit={this.onSubmitLogin}>
              <div className="username-input-container">
                <label htmlFor="username" className="username-label">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="username-input-field"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="password-input-container">
                <label htmlFor="password" className="password-label">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="password-input-field"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              {showError && (
                <p className="error-message">
                  Please enter a valid Username & Password
                </p>
              )}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634216973/Rectangle_1456_pb1rmh.jpg"
          className="website-login-image"
          alt="website login"
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginPage()
  }
}

export default Login
