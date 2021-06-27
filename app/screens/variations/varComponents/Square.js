import React from 'react';
import colors from '../../../config/colors'
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Piece from './Piece'

function Square(props) {
    const color = props.color === 1 ? colors.grey1 : colors.secondary;
    // Find whether there is a piece on the square
    let isPieceOnSquare = false;
    let pieceOnSquare = {
        position: 0,
        type: 'p',
        side: true,
        moved: false,
    };
    for (let piece of props.BoardLayout) {
        if (props.position === piece.position) {
            isPieceOnSquare = true;
            pieceOnSquare = piece;
        };
    };
    return(
        <View style={{
            height: 40,
            width: 40,
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {
                isPieceOnSquare ? <Piece piece={pieceOnSquare}/> : null
            }        
        </View>
    );
};


export default Square;