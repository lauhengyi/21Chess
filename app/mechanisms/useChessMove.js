import { useReducer } from 'react';
import { executeMove } from './normalChess';

function chessMovesReducer(state, action) {
    //Making deep copy
    let newDetails = Object.assign({}, state);
    switch (action.type) {
        case 'pieceClick': {
            newDetails.boardLayout = state.boardLayout.map(a => ({...a}));
            newDetails.moveables = action.move;
            return newDetails;
        }
        case 'makeTurn': {
            //Make move
            newDetails.boardLayout = executeMove(action.move, state.boardLayout, action.castling);
            //Add eaten length         
            if (action.move.length > 2) {
                let side = state.boardLayout[action.move[0]].side;
                let piece = state.boardLayout[action.move[2]];
                newDetails.eatenPieces.push(side, piece);
            }
            //Change Side
            newDetails.currentSide = !state.currentSide;

            //Remove moveables
            newDetails.moveables = [null, null];

            //Add last moved
            newDetails.lastMoved = [action.move, action.castling];
            return newDetails;
        }
        default: {
            console.log('type not specified')
            return state;
        }
    };
};

function useChessMove(initialBoard, initialSide) {
    const initialDetails = {
        boardLayout: initialBoard,
        moveables: [null, null],
        currentSide: initialSide,
        lastMoved: [null, null],
        eatenPieces: [],
    };
    return useReducer(chessMovesReducer, initialDetails);
};

export default useChessMove;