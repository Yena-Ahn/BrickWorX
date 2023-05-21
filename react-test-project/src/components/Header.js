
import PropTypes from 'prop-types'
import Button from './Button'

// const Header = (props) => {
//   return (
//     <header><h1>{props.title}aaaaaa</h1></header>
//   )
// }

//destructered props
const Header = ({title}) => {
    return (
      <header>
        <h1 style={{ color: 'red'}}>{title}aaaaaa</h1>
        <Button color='green' text='hello'/>
      </header>
    )
  }
  


// DEFAULT PROPS

Header.defaultProps = {
    title:'default prop test ',
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header