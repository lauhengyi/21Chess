import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import colors from '../../../config/colors';
import SquaresRow from './SquaresRow';

function Board(props) {
    // Passing down constants
    const BoardLayout = props.BoardLayout;
    const moveables = props.Moveables;

    // Pasing down reducer hooks
    function makeMove(action) {
        return props.onMove(action)
    };

    function makeMoveables(action) {
        return props.onPieceClick(action)
    };
    
    // Mapping rows
    const rows = [0, 1, 2, 3, 4, 5, 6, 7]

    return(
    //make board
        <View style={styles.board}>
            {rows.map(index => <SquaresRow 
            key={index}
            index={index} 
            BoardLayout={BoardLayout} 
            Moveables={moveables}
            onMove={makeMove} 
            onPieceClick={makeMoveables}
            />)}
            
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        alignContent: 'center',
        flexDirection: 'column-reverse',
        color: colors.black,
    },

});

export default Board;