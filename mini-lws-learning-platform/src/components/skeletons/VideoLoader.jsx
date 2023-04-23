import ContentLoader from 'react-content-loader';

const VideoLoader = (props) => (
    <ContentLoader
        speed={2}
        height={75}
        viewBox="0 0 600 124"
        backgroundColor="#f3f3f3"
        foregroundColor="#808080"
        {...props}
    >
        <circle cx="24" cy="35" r="16" />
        <rect x="50" y="20" rx="3" ry="3" width="490" height="18" />
        <rect x="50" y="48" rx="3" ry="3" width="247" height="18" />
        <rect x="50" y="80" rx="3" ry="3" width="82" height="14" />
        <rect x="145" y="79" rx="3" ry="3" width="5" height="16" />
        <rect x="165" y="80" rx="3" ry="3" width="62" height="14" />
    </ContentLoader>
);

export default VideoLoader;
