import { Link } from 'react-router-dom';
import logoImage from '../../assets/image/learningportal.svg';

const Logo = () => {
    return (
        <Link to="/" className="flex justify-center">
            <img className="h-10" src={logoImage} alt="lws-logo" />
        </Link>
    );
};

export default Logo;
