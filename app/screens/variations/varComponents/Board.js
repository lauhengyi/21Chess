import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import colors from '../../../config/colors';
import SquaresRow from './SquaresRow';

function Board(props) {
    const BoardLayout = props.BoardLayout;
    return(
    //make board
        <View style={styles.board}>
            <SquaresRow index={0} BoardLayout={BoardLayout}/>
            <SquaresRow index={1} BoardLayout={BoardLayout}/>
            <SquaresRow index={2} BoardLayout={BoardLayout}/>
            <SquaresRow index={3} BoardLayout={BoardLayout}/>
            <SquaresRow index={4} BoardLayout={BoardLayout}/>
            <SquaresRow index={5} BoardLayout={BoardLayout}/>
            <SquaresRow index={6} BoardLayout={BoardLayout}/>
            <SquaresRow index={7} BoardLayout={BoardLayout}/>
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