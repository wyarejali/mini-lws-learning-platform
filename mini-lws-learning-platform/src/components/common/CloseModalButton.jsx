import closeIcon from '../../assets/icon/close.png';

const CloseModalButton = ({ closeHandler }) => {
    return (
        <button
            className="absolute -top-3 -right-3 bg-slate-600 hover:bg-slate-500 w-7 h-7 rounded-full flex justify-center items-center"
            onClick={closeHandler}
        >
            <img src={closeIcon} className="w-3 h-3" alt="close" />
        </button>
    );
};

export default CloseModalButton;
