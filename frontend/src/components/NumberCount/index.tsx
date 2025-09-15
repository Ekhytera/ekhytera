"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

export default function NumberCount() {
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        const controls = animate(count, 15600, { duration: 5 })
        return () => controls.stop()
    }, [])

    return <motion.span style={text}>{rounded}</motion.span>
}

/**
 * ==============   Styles   ================
 */

const text = {
    fontSize: "inherit",
    color: "#79A7DD",
    fontWeight: "bold",
    display: "inline",
}
