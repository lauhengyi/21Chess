import React from 'react';
import { View, StyleSheet, } from 'react-native';
import Square from './Square'
import SquareLayout from './SquareLayout'

function SquaresRow(props) {
    // Passing down constants
    return(
        <View style={styles.row}>
            {SquareLayout[props.index].map(squares => <Square
            key={squares.position}
            position={squares.position}
            color={squares.color}
            BoardLayout={props.BoardLayout}
            Moveables={props.Moveables}
            currentSide={props.currentSide} 
            onMove={(action) => props.onMove(action)} 
            onPieceClick={(moves) => props.onPieceClick(moves)}
            changeSide={(side) => props.changeSide(side)}
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