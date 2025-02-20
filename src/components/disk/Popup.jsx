import React, { useState } from 'react';
import Input from "../../utils/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../reducers/fileReducer";
import { createDir } from "../../actions/file";

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function createHandler() {
        dispatch(createDir(currentDir, dirName))
    }

    return (
        <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{ display: popupDisplay }}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Створити нову папку</div>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>
                        {/* X */}
                        <HighlightOffIcon />
                    </button>
                </div>
                <Input type="text" placeholder="Введіть назву папки..." value={dirName} setValue={setDirName} />
                {/* <button className="popup__create" onClick={() => createHandler()}>Створити</button> */}
                <Button
                    variant="contained" color="primary"
                    className="popup__create" onClick={() => createHandler()}>Створити</Button>
                {/* <Button onClick={() => dispatch(setPopupDisplay('none'))}>Закрити</Button> */}
            </div>
        </div>
    );
};

export default Popup;
