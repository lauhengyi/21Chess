import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Square from './Square'
import SquareLayout from './SquareLayout'

function SquaresRow(props) {
    const BoardLayout = props.BoardLayout
    return(
        <View style={styles.row}>
            {SquareLayout[props.index].map(squares => <Square
            key={squares.position}
            position={squares.position}
            color={squares.color}
            BoardLayout = {BoardLayout}
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