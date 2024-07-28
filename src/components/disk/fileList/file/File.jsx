// import React from 'react';

import React, { useState } from 'react';

import './file.css'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

import PermMediaIcon from '@material-ui/icons/PermMedia';
// import FolderIcon from '@material-ui/icons/Folder'; // Import Material-UI Folder icon
import DescriptionIcon from '@material-ui/icons/Description'; // Import Material-UI Description (file) icon
import MoreVertIcon from '@material-ui/icons/MoreVert'; // Import Material-UI MoreVert icon
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    delete: {
        color: '#FF0101', // Червоний колір для "Видалити"
    },
    download: {
        color: '#21cf69', // Зелений колір для "Завантажити"
    },
}));



const File = ({ file }) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)

    const classes = useStyles();



    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        event.stopPropagation(); // Зупинка поширення події
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        e.stopPropagation()
        setAnchorEl(null);
    };

    function openDirHandler(file) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (fileView === 'list') {
        return (
            <div className='file file-enter-active' onClick={() => openDirHandler(file)}>

                {/* <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" /> */}
                {
                    file.type === 'dir'
                        ?
                        <PermMediaIcon className="file__icion" />
                        :
                        <DescriptionIcon className="file__icion" />

                }

                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {/* {file.type !== 'dir' && */}
                {/* // <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download">завантажити</button>} */}
                {/* <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">видалити</button> */}

                {/* <MoreVertIcon className="file__more" /> */}
                <MoreVertIcon className="file__more" onClick={handleClick} />
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {file.type !== 'dir' && (
                        // <MenuItem onClick={(e) => downloadClickHandler(e)}>
                        <MenuItem onClick={(e) => downloadClickHandler(e)} className={classes.download}>
                            Завантажити
                        </MenuItem>
                    )}
                    {/* <MenuItem onClick={(e) => deleteClickHandler(e)}>Видалити</MenuItem> */}
                    <MenuItem onClick={(e) => deleteClickHandler(e)} className={classes.delete}>Видалити</MenuItem>

                </Menu>

            </div>
        );
    }
    if (fileView === 'plate') {
        return (
            <div className='file-plate file-enter-active' onClick={() => openDirHandler(file)}>
                {/* <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img" /> */}
                {
                    file.type === 'dir'
                        ?
                        <PermMediaIcon className="file__icion" />
                        :
                        <DescriptionIcon className="file__icion" />

                }
                <div className="file-plate__name">{file.name}</div>
                {/* <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                        <button onClick={(e) => downloadClickHandler(e)} className="file-plate__btn file-plate__download">завантажити</button>}
                    <button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete">видалити</button>
                </div> */}
                {/* <MoreVertIcon className="file__more" onClick={handleClick} /> */}
                <MoreHorizIcon className="file__more" onClick={handleClick} />
                {/* import MoreHorizIcon from '@material-ui/icons/MoreHoriz'; */}
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {file.type !== 'dir' && (
                        // <MenuItem onClick={(e) => downloadClickHandler(e)}>Завантажити</MenuItem>
                        <MenuItem onClick={(e) => downloadClickHandler(e)} className={classes.download}>Завантажити</MenuItem>


                    )}
                    {/* <MenuItem onClick={(e) => deleteClickHandler(e)}>Видалити</MenuItem> */}
                    <MenuItem onClick={(e) => deleteClickHandler(e)} className={classes.delete}>Видалити</MenuItem>

                </Menu>
            </div>
        );
    }

};

export default File;
