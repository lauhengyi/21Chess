import React from 'react';
import colors from '../../../config/colors'
import { View, Pressable } from 'react-native';
import Piece from './Piece';
import { checkCollision } from '../../../mechanisms/normalChess';

function Square(props) {
    // Passing down constants
    const BoardLayout = props.BoardLayout;
    const moveables = props.Moveables;
    // Determine color of square: black and white, moveable or not
    const color = props.color === 1 ? [colors.grey1, colors.moveableSquareBlack] 
    : [colors.secondary, colors.moveableSquareWhite];

    // Find whether there is a piece on the square
    let isPieceOnSquare;
    let pieceId;
    [isPieceOnSquare, ,pieceId] = checkCollision(props.position, BoardLayout);

    // Find whether these is a moveable on the square
    let isMoveableOnSquare = false;
    let castling = false;
    // The id of the piece which formed the moveable
    let moveableMove;
    // Check for normal moves
    if (moveables[0]) {
        for (let moveable of moveables[0]) {
            if (props.position === moveable[1]) {
                moveableMove = moveable;
                isMoveableOnSquare = true;
            };
        };
    };
    if (moveables[1]) {
        //Check castling moves
        for (let moveable of moveables[1]) {
            if (props.position === moveable[0][1]) {
                moveableMove = moveable;
                isMoveableOnSquare = true;
                castling = true;
            };
        }; 
    };

    // Render moveables and render pieces
    if (isMoveableOnSquare) {
        return(
            <Pressable onPress={() => props.onMove({
            move: moveableMove,
            castling: castling,
            })}>
                <View style={{
                    height: 45,
                    width: 45,
                    backgroundColor: color[1],
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {
                        isPieceOnSquare ? <Piece 
                        BoardLayout={BoardLayout}
                        Moveables={moveables}
                        currentSide={props.currentSide}
                        pieceId={pieceId}
                        onPieceClick={(moves) => props.onPieceClick(moves)}
                        changeSide={(side) => props.changeSide(side)}
                        /> : null
                    }        
                </View>
            </Pressable>
        );
    } else {
        return(
        
            <View style={{
                height: 45,
                width: 45,
                backgroundColor: color[0],
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {
                    isPieceOnSquare ? <Piece
                    BoardLayout={BoardLayout}
                    Moveables={moveables}
                    currentSide={props.currentSide}
                    pieceId={pieceId}
                    onPieceClick={(moves) => props.onPieceClick(moves)}
                    changeSide={(side) => props.changeSide(side)}
                    /> : null
                }        
            </View>
        );
    }
    
};


export default Square;