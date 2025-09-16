"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

interface NumberCountProps {
    startCounting?: boolean;
}

export default function NumberCount({ startCounting = true }: NumberCountProps) {
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        if (startCounting) {
            const controls = animate(count, 15600, { duration: 5 })
            return () => controls.stop()
        }
    }, [startCounting])

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
