import React, { CSSProperties } from 'react'
import {withStyle} from './hooks'
import withContext from './withContext'
interface ABMProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function 
}

const getSquares : Function = (n : number, w : number, h : number, scale : number, onClick : Function) => {
    const {blockStyle} = withStyle(w, h, scale)
    const divs = []
    for (let j = 0; j < n; j++) {
        divs.push((<div onClick = {() => onClick()} key = {`square_${j}`} style = {blockStyle(j)}></div>))
    }
    return divs
} 

const AltBarMover : React.FC<ABMProps> = (props : ABMProps) => {
    
    return (
        <React.Fragment>
            {getSquares(5, props.w, props.h, props.scale, props.onClick)}
        </React.Fragment>
    )
}

export default withContext(AltBarMover)