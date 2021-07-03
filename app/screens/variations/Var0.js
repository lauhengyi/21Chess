import React, { useReducer } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Board from './varComponents/Board';
import BoardLayout from './boardLayouts/var0Layout';
import { executeMove } from '../../mechanisms/normalChess';

// reducer function for makeMove
function makeMoveReducer(state, action) {
    return executeMove(action.move, state, action.castling);
};

// reducer function for moveables
function moveablesReducer(state, action) {
    let moveables = action.moves;
    return moveables;
}

function Var0({navigation, route}) {
    // Position of pieces
    const [Layout, moveFunction] = useReducer(makeMoveReducer, BoardLayout);
    function makeMove(action) {
        return moveFunction(action);
    };
    // Position of possible clickable moves of clicked piece, moveables is a tuple, 
    // where moveables[0] is the id of the piece in the layout, and moveables[1] is the list of moveable positions
    const [moveables, moveablesFunction] = useReducer(moveablesReducer, [null, null]);
    function makeMoveables(action) {
        return moveablesFunction(action);
    };

    // Position of last moved piece
    
    return(
        <View style={styles.boardContainer}>
            <Board 
            BoardLayout={Layout} 
            Moveables={moveables}
            onMove={makeMove} 
            onPieceClick={makeMoveables}/>
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