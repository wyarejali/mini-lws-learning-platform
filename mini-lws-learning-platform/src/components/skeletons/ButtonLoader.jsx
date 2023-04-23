import ContentLoader from 'react-content-loader';

const ButtonLoader = (props) => (
    <ContentLoader
        speed={2}
        width={140}
        height={42}
        viewBox="0 0 140 42"
        backgroundColor="#f3f3f3"
        foregroundColor="#808080"
        {...props}
    >
        <rect x="0" y="7" rx="18" ry="18" width="140" height="32" />
    </ContentLoader>
);

export default ButtonLoader;
