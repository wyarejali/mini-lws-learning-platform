import { Helmet } from 'react-helmet';

const Meta = ({ title }) => {
    return (
        <Helmet>
            <title>
                {title ? title + ' - ' : ''} Mini LWS Learning Platform
            </title>
        </Helmet>
    );
};

export default Meta;
