import ContentLoader from 'react-content-loader';

const TitleAndDateLoader = (props) => (
    <ContentLoader
        speed={2}
        width={476}
        height={50}
        viewBox="0 0 476 42"
        backgroundColor="#f3f3f3"
        foregroundColor="#808080"
        {...props}
    >
        <rect x="0" y="-1" rx="3" ry="3" width="476" height="14" />
        <rect x="0" y="24" rx="3" ry="3" width="217" height="12" />
    </ContentLoader>
);

export default TitleAndDateLoader;
