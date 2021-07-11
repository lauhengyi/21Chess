import React from 'react';
import { Text, Pressable } from 'react-native';
import { validMoves } from '../../../mechanisms/normalChess';

function Piece(props) {

    // Passing down constants
    const BoardLayout = props.BoardLayout;
    const moveables = props.Moveables;
    const piece = BoardLayout[props.pieceId];
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
    function handlePiecePress() {
        let moves = validMoves(props.pieceId, BoardLayout, null);
        if (JSON.stringify(moves) == JSON.stringify(moveables)) {
            props.onPieceClick([null, null]);
        } else {
            props.onPieceClick(moves);
        }
    }; 
    if (props.currentSide === piece.side) {
        return(
            <Pressable onPress = {handlePiecePress}>  
                <Text style={{fontFamily: 'Meri', fontSize: 40}}>
                    {PieceKey[type]}
                </Text>
            </Pressable>
        );
    } else {
        return(
            <Text style={{fontFamily: 'Meri', fontSize: 40}}>
                {PieceKey[type]}
            </Text>
        );
    };
};

export default Piece;