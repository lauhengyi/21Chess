import React, { useReducer, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Board from './varComponents/Board';
import Layout from './boardLayouts/var0Layout';
import { executeMove } from '../../mechanisms/normalChess';

// reducer function for makeMove
function makeMoveReducer(state, action) {
    return executeMove(action.move, state, action.castling);
};

function Var0({navigation, route}) {
    const initialBoard = Layout;
    // Establish starting side
    const [currentSide, changeSide] = useState(true);
    // Position of pieces
    const [BoardLayout, makeMove] = useReducer(makeMoveReducer, initialBoard);
    // Position of possible clickable moves of clicked piece, moveables is a tuple, 
    // where moveables[0] is the id of the piece in the layout, and moveables[1] is the list of moveable positions
    const [moveables, setMoveables] = useState([null, null]);
    // Last moved pieces 
    const [lastMoved, setLastMoved] = useState([null, null]);
    // Position of last moved piece
    function makeTurn(action) {
        //make Move
        makeMove(action);
        //Change side
        changeSide(a => !a);
        //Remove moveables
        setMoveables([null, null]);
        //Update last moved, depends on castle
        if (action.castling === true) {
            setLastMoved()
        }
        setLastMoved(action.move, action.castling)
    }
    return(
        <View style={styles.boardContainer}>
            <Board 
            BoardLayout={BoardLayout} 
            Moveables={moveables}
            currentSide={currentSide}
            onMove={(action) => makeMove(action)} 
            onPieceClick={(moves) => setMoveables(moves)}
            sideChange={(side) => changeSide(side)}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    boardContainer: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default Var0;