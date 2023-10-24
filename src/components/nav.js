import {
    NavLink,
  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask } from '@fortawesome/free-solid-svg-icons'

function Nav(props) {
    return (
        <nav>
            <ul>
                <div>
                    <li id="home-icon">
                        <NavLink to="/" className="inactive-home">
                            <FontAwesomeIcon icon={faFlask} />
                            <div>DataVizHub</div>
                        </NavLink>
                    </li>
                </div>
                <div id="non-home-nav">
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "inactive")}>Scatterplot</NavLink></li>
                    <li><NavLink to="/histogram" className={({ isActive }) => (isActive ? "active" : "inactive")}>Histogram</NavLink></li>
                </div>
            </ul>
        </nav>
    );
}

export default Nav;