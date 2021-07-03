import React from 'react';
import { Text, Pressable } from 'react-native';
import { validMoves } from '../../../mechanisms/normalChess';

function Piece(props) {

    const BoardLayout = props.BoardLayout;
    const piece = BoardLayout[props.pieceId];
    // Pasing down reducer hooks
    function makeMoveables(action) {
        return props.onPieceClick(action)
    };

    let moves = validMoves(props.pieceId, BoardLayout, null);

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


    const PieceKey = piece.side ? PieceKeyBoth.white : PieceKeyBoth.black;
    const type = piece.type;

    return(
        <Pressable onPress = {makeMoveables(moves)}>
            <Text style={{fontFamily: 'Meri', fontSize: 40}}>
                {PieceKey[type]}
            </Text>
        </Pressable>
    );
};

export default Piece;