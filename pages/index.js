import { HomePage } from '../src/HomePage'

let isAuth = typeof window !== 'undefined' && window.localStorage.getItem('isAuth')
const Home = props => {
  if (typeof window === 'undefined') {
    return null
  }
  if (!isAuth) {
    if (window.prompt() !== 'sila.codeforpublic') {
      window.alert('Unauthorize !!')
      return null
    }
    isAuth = true
    localStorage.setItem('isAuth', true)
  }
  return <HomePage {...props} />
}

export default Home
