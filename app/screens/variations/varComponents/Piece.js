import React from 'react';
import { Text, Pressable } from 'react-native';
import { validMoves } from '../../../mechanisms/normalChess';

function Piece(props) {
    // Passing down constants
    const boardLayout = props.gameDetails.boardLayout;
    const moveables = props.gameDetails.moveables;
    const piece = boardLayout[props.pieceId];
    const currentSide = props.gameDetails.currentSide;
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
        let moves = validMoves(props.pieceId, boardLayout, null);
        if (JSON.stringify(moves) == JSON.stringify(moveables)) {
            props.onAction({type:'pieceClick', move:[null,null]});
        } else {
            props.onAction({type:'pieceClick', move:moves});
        };
    }; 
    if (currentSide === piece.side) {
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