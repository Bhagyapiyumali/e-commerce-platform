import { Link } from 'react-router-dom';
import './homePage.css';

export default function HomePage() {
    return (
        <div className="home-container ">
            <h1 className="home-title">Welcome to the Home Page</h1>
            <p>This is the main landing page of the application.</p>
            <button onClick={() => alert ('Button clicked!')}>Get Started</button>

            <Link to="/login">Go to Login Page</Link> 
        </div>
    )
}