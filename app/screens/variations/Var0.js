import React, { useReducer } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Board from './varComponents/Board';
import useChessMove from '../../mechanisms/useChessMove';
import layout from './boardLayouts/var0Layout'

function Var0({navigation, route}) {
    const initialBoard = layout;
    const initialSide = true;

    const [gameDetails, chessActions] = useChessMove(initialBoard, initialSide);
    return(
        <View style={styles.boardContainer}>
            <Board 
            gameDetails={gameDetails}
            onAction={chessActions} 
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