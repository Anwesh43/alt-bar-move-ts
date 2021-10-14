import {useState, useEffect} from 'react'

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
