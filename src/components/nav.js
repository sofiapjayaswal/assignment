import {
    NavLink,
  } from 'react-router-dom';
function Nav(props) {
    return (
        <nav>
        <ul>
            <div>
            </div>
            <div id="non-home-nav">
                <li><NavLink to="/scatter">Scatterplot</NavLink></li>
                <li><NavLink to="/histo">Histogram</NavLink></li>
            </div>
        </ul>
        </nav>
    );
}

export default Nav;