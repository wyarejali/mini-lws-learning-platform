import VideoForm from '../../components/admin/VideoForm';
import Meta from '../../components/common/Meta';

const AddVideo = () => {
    return (
        <>
            <Meta title="Add Video" />
            <section className="py-6 bg-primary h-screen grid ">
                <div className="mx-auto lg:w-[768px] w-full">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Add New Video
                    </h2>

                    <div className="mt-6">
                        <VideoForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddVideo;
