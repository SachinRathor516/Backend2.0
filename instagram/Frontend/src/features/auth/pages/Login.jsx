import {Link} from 'react-router'
import '../style/form.scss'
const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <input type="username" name='username' placeholder='Enter username' />
          <input type="password" name='password' placeholder='Enter password' />
          <button>Login</button>
        </form>
        <p>don't have an account ? <Link to= '/register'>Register</Link></p>
      </div>
    </main>
  )
}

export default Login
