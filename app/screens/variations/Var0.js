import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Board from './varComponents/Board';
import BoardLayout from './boardLayouts/var0Layout'

function Var0({navigation, route}) {
    const Layout = BoardLayout;
    return(
        <View style={styles.boardContainer}>
            <Board BoardLayout={Layout}/>
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