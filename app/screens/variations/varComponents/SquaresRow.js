import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Square from './Square'
import SquareLayout from './SquareLayout'

function SquaresRow(props) {
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

    return(
        <View style={styles.row}>
            {SquareLayout[props.index].map(squares => <Square
            key={squares.position}
            position={squares.position}
            color={squares.color}
            BoardLayout={BoardLayout}
            Moveables={moveables}
            onMove={makeMove}
            onPieceClick={makeMoveables}
            />)}
        </View>
    );
    
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default SquaresRow;