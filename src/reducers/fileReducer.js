const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
// Додано новий тип action
const SET_CURRENT_DIR_PATH = "SET_CURRENT_PATH";
const ADD_FILE = "ADD_FILE"
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"
const PUSH_TO_STACK = "PUSH_TO_STACK"
const DELETE_FILE = 'DELETE_FILE'
const SET_VIEW = 'SET_VIEW'

const RESET_STATE = "RESET_STATE"; // Новий тип action


const defaultState = {
    files: [],
    currentDir: null,
    currentDirtPath: 'Root', // Додано для збереження поточного шляху
    popupDisplay: 'none',
    dirStack: [],
    view: 'list'
}

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FILES: return { ...state, files: action.payload }
        case SET_CURRENT_DIR: return { ...state, currentDir: action.payload }
        // Додано для оновлення currentPath
        case SET_CURRENT_DIR_PATH:
            return { ...state, currentDirtPath: action.payload };
        case ADD_FILE: return { ...state, files: [...state.files, action.payload] }
        case SET_POPUP_DISPLAY: return { ...state, popupDisplay: action.payload }
        case PUSH_TO_STACK: return { ...state, dirStack: [...state.dirStack, action.payload] }
        case DELETE_FILE: return { ...state, files: [...state.files.filter(file => file._id != action.payload)] }
        case SET_VIEW: return { ...state, view: action.payload }

        case RESET_STATE: return defaultState; // повертає стан до початкового

        default:
            return state
    }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files })
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir })
// Додано
export const setCurrentDirPath = path => ({ type: SET_CURRENT_DIR_PATH, payload: path }); 
export const addFile = (file) => ({ type: ADD_FILE, payload: file })
export const setPopupDisplay = (display) => ({ type: SET_POPUP_DISPLAY, payload: display })
export const pushToStack = (dir) => ({ type: PUSH_TO_STACK, payload: dir })
export const deleteFileAction = (dirId) => ({ type: DELETE_FILE, payload: dirId })
export const setFileView = (payload) => ({ type: SET_VIEW, payload })

// Action creator для скидання стану
export const resetState = () => ({ type: RESET_STATE });