import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { createDir, getFiles, uploadFile } from "../../actions/file";
import { createDir, getFiles, uploadFile, getCurrentDirPath } from "../../actions/file";
import FileList from "./fileList/FileList";
import './disk.css'
import Popup from "./Popup";
import { setCurrentDir, setFileView, setPopupDisplay } from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";


import Button from '@material-ui/core/Button'; // Import Material-UI Button
import Select from '@material-ui/core/Select'; // Import Material-UI Select
import MenuItem from '@material-ui/core/MenuItem'; // Import Material-UI MenuItem

// import axios from 'axios';  // Додано для нових запитів

// import ReorderIcon from '@mui/icons-material/Reorder';
import ReorderIcon from '@material-ui/icons/Reorder';

import GridOnIcon from '@material-ui/icons/GridOn'; // Import Material-UI GridOn icon
import ListIcon from '@material-ui/icons/List'; // Import Material-UI List icon
import AppsIcon from '@material-ui/icons/Apps';

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    // currentDirtPath
    const currentDirtPath = useSelector(state => state.files.currentDirtPath)
    const loader = useSelector(state => state.app.loader)
    const dirStack = useSelector(state => state.files.dirStack)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    const [currentDirPath, setCurrentDirPath] = useState('');  // Додано для зберігання шляху


    localStorage.getItem('token')

    // useEffect(() => {
    //     dispatch(getFiles(currentDir, sort))
    // }, [currentDir, sort])

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
        dispatch(getCurrentDirPath(currentDir));
    }, [currentDir, sort, dispatch]);

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    if (loader) {
        // if (true) {
        return (
            <div className="loader">
                {/* <div className="lds-dual-ring"></div> */}
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (!dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                {/* <Button  className="disk__back" variant="contained" onClick={() => backClickHandler()}>Назад</Button> */}
                {/* <Button className="disk__create" onClick={() => showPopupHandler()}>Створити папку</Button> */}
                <Button variant="contained"  onClick={backClickHandler} className="disk__back">Назад</Button>
                <Button variant="contained" onClick={showPopupHandler} className="disk__create">Створити папку</Button>
               
                
                
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Завантажити файл</label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input" />
                </div>
                {/* <select value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className='disk__select'>
                    <option value="name">За ім'ям</option>
                    <option value="type">По типу</option>
                    <option value="date">По даті</option>
                </select> */}
                 <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className='disk__select'
                        style={{ color: '#2196f3' }}
                    >
                        <MenuItem value="name">За ім'ям</MenuItem>
                        <MenuItem value="type">По типу</MenuItem>
                        <MenuItem value="date">По даті</MenuItem>
                    </Select>
                <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))} ><AppsIcon className='plate_icon'/></button>
                <button className="disk__list" onClick={() => dispatch(setFileView('list'))} ><ReorderIcon className='list_icon'/></button>
            </div>

            <div className="current-dir-path">Поточна директорія: {currentDirtPath}</div> {/* Виведення шляху */}

            <FileList />
            <Popup />
            <Uploader />
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Перетягніть файли сюди
        </div>
    );
};

export default Disk;
