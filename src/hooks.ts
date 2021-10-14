import {useState, useEffect, CSSProperties} from 'react'

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + 0.02 
                    })
                }, 20)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
    });
    return {
        w, 
        h,
    }
}

const maxScale = (
    scale : number,
    i : number,
    n : number) : number => Math.max(0, scale - i / n) 
    
const divideScale = (
    scale : number,
    i : number,
    n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 


const n : number = 5 

const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const sf : number = sinify(scale)
    const position = 'absolute'
    const size = Math.min(w, h) / 10
    const width = `${size}px`
    const height = `${size}px`
    const background = 'indigo'
    return {
        blockStyle(i : number) : CSSProperties {
            const sfj : number = divideScale(sf, i, n)
            const top = `${i * size}px`
            const left = `${(w / 2 - size / 2) * sfj}px`
            return {
                position, 
                width, 
                height, 
                top, 
                left, 
                background 
            }
        }
    }
}