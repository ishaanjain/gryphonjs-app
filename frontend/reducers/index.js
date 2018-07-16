const initialKeyFrame = {
    keyFrameNum: 0,
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
    timingFunction: 'Linear',
    timestamp: 0
};

const initialState = {
    name: 'Gryphon',
    currentProgress: 0,
    duration: 2000,
    isAnimating: false,
    userIsDraggingElement: false,
    dragChanges: null,
    keyFrames: [initialKeyFrame],
    numDeletedKeyFrames: 0,
    selectedKeyFrame: null
};

function rootReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case 'UPDATE_CURRENT_PROGRESS':
            newState = Object.assign({}, state);
            newState.currentProgress = action.currentProgress;
            newState.isAnimating = false;
            newState.selectedKeyFrame = null;
            return newState;
        case 'SET_DURATION':
            newState = Object.assign({}, state);
            newState.duration = action.duration;
            newState.selectedKeyFrame = null;
            return newState;
        case 'START_ANIMATION':
            newState = Object.assign({}, state);
            newState.isAnimating = true;
            newState.selectedKeyFrame = null;
            return newState;
        case 'ELEMENT_DRAG_START':
            newState = Object.assign({}, state);
            newState.userIsDraggingElement = true;
            return newState;
        case 'ELEMENT_DRAG_STOP':
            newState = Object.assign({}, state);
            newState.userIsDraggingElement = false;
            newState.dragChanges = action.dragChanges;
            return newState;
        case 'CREATE_KEY_FRAME':
            newState = Object.assign({}, state);
            let freeSpaceExists = true;
            for (let i = 0; i < newState.keyFrames.length; i++) {
                const keyFrameProgress = newState.keyFrames[i].timestamp / newState.duration;
                if (newState.currentProgress < keyFrameProgress + 0.02 &&
                    newState.currentProgress > keyFrameProgress - 0.02) {
                    freeSpaceExists = false;
                }
            }
            if (freeSpaceExists) {
                const timestamp = newState.currentProgress * newState.duration;
                const newKeyFrame = Object.assign({}, action.keyFrame, {timestamp});
                const newKeyFrames = [...newState.keyFrames, newKeyFrame].sort((a, b) => {
                    return a.timestamp - b.timestamp;
                });
                newState.keyFrames = newKeyFrames;
            } else {
                const message = `Woah woah woah dude don't go trying to create
                dots on top of each other. It's a dangerous game my friend.`;
                alert(message); // eslint-disable-line no-alert
            }
            return newState;
        case 'SELECT_KEY_FRAME':
            newState = Object.assign({}, state);
            for (let i = 0; i < newState.keyFrames.length; i++) {
                if (newState.keyFrames[i].keyFrameNum === action.keyFrameNum) {
                    newState.isAnimating = false;
                    newState.selectedKeyFrame = newState.keyFrames[i];
                    return newState;
                }
            }
            throw new Error('The key frame you are selecting does not exist in the state.');
        case 'UPDATE_KEY_FRAME':
            newState = Object.assign({}, state);
            for (let i = 0; i < newState.keyFrames.length; i++) {
                if (newState.keyFrames[i].keyFrameNum === action.keyFrame.keyFrameNum) {
                    const newKeyFrames = [...newState.keyFrames];
                    newKeyFrames[i] = Object.assign({}, action.keyFrame);
                    newState.keyFrames = newKeyFrames;
                    newState.selectedKeyFrame = null;
                    return newState;
                }
            }
            throw new Error('The key frame you are updating does not exist in the state.');
        case 'DELETE_KEY_FRAME':
            newState = Object.assign({}, state);
            for (let i = 0; i < newState.keyFrames.length; i++) {
                if (newState.keyFrames[i].keyFrameNum === newState.selectedKeyFrame.keyFrameNum) {
                    const newKeyFrames = [...newState.keyFrames];
                    newKeyFrames.splice(i, 1);
                    newState.keyFrames = newKeyFrames;
                    newState.numDeletedKeyFrames = newState.numDeletedKeyFrames + 1;
                    newState.selectedKeyFrame = null;
                    return newState;
                }
            }
            throw new Error('Key frame you are deleting does not exist in the state.');
        default:
            return state;
    }
}

export default rootReducer;
