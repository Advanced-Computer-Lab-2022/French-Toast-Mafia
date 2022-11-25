import PropTypes from ' prop-types ';

const Button = ({ color, text , onClick   }) => {
    return (
        <Button 
        onClick={onClick}
        style={{ backgroundColor : color   }}
        className = 'btn'
        >
            { text }

        </Button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.PropTypes = {
    text: PropTypes.string , 
    color: PropTypes.string ,
    onclick: PropTypes.func

} 

export default Button
