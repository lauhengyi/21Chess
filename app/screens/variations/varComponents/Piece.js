import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

function Piece(props) {
    //Linking each piece's type to their corresponding chess font
    const PieceKeyBoth = {
        white: {
            p: 'p', 
            r: 'r', 
            n: 'n', 
            b: 'b',
            q: 'q',
            k: 'k',
        },

        black: {
            p: 'o', 
            r: 't',
            n: 'm',
            b: 'v',
            q: 'w',
            k: 'l',
        }
    };

    const PieceKey = props.piece.side ? PieceKeyBoth.white : PieceKeyBoth.black;
    const type = props.piece.type;

    return(
        <Text style={{fontFamily: 'Meri', fontSize: 40}}>
            {PieceKey[type]}
        </Text>
    );
};

export default Piece;