import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={847}
        height={478}
        viewBox="0 0 847 478"
        backgroundColor="#f3f3f3"
        foregroundColor="#808080"
        {...props}
    >
        <rect x="0" y="-1" rx="0" ry="0" width="847" height="478" />
    </ContentLoader>
);

export default MyLoader;
