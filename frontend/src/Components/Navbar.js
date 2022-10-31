import {Link} from 'react-router-dom'
const Navbar = () => {

    return (
        <header>
            <div className='navBar'>
                <Link to='/'>
                    <p><strong>Nav Bar Component</strong></p>
                    </Link>
                </div>
        </header>
    )
}

export default Navbar