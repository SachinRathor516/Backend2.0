import {Link} from 'react-router'
import '../style/form.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {handleLogin , loading} = useAuth()
  const navigate = useNavigate()


  if (loading) {
    return(
      <h1>loading....</h1>
    )
  }
 

  async function handleSubmit(e) {
    e.preventDefault()
   handleLogin(username , password)

   .then(res=>{
    console.log(res);
    navigate('/')

    
   })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onInput={(e)=>{setUsername(e.target.value)}}
          type="username" 
          name='username' 
          placeholder='Enter username' />
          <input 
          onInput={(e)=>{setPassword(e.target.value)}}
          type="password" 
          name='password' 
          placeholder='Enter password' />
          <button>Login</button>
        </form>
        <p>don't have an account ? <Link to= '/register'>Register</Link></p>
      </div>
    </main>
  )
}

export default Login
