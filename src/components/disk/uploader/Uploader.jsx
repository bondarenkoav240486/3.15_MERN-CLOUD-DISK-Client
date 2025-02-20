import React from 'react';
import UploadFile from "./UploadFile";
import './uploader.css'
import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";

// import CloseIcon from '@material-ui/icons/Close'; // Import Close icon
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

    return (isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Завантаження</div>
                <button className="uploader__close" onClick={() => dispatch(hideUploader())}>
                    {/* X */}
                    <HighlightOffIcon/>
                </button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file} />
            )}
        </div>
    );
};

export default Uploader;
