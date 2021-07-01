import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { trySignIn } from '../redux/reducers/auth'

const Startup = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(trySignIn())
  }, [])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
