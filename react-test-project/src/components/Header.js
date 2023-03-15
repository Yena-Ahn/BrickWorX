


// const Header = (props) => {
//   return (
//     <header><h1>{props.title}aaaaaa</h1></header>
//   )
// }

//destructered props
const Header = ({title}) => {
    return (
      <header><h1>{title}aaaaaa</h1></header>
    )
  }
  


// DEFAULT PROPS

Header.defaultProps = {
    title:'default prop test ',
}

export default Header