"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "purple" | "gold" | "softgray";
}

export function NeonButton({ children, className, variant = "purple", ...props }: NeonButtonProps) {
    const getColors = () => {
        switch (variant) {
            case "gold":
                return "border-gold text-gold hover:bg-gold/10 shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)]";
            case "softgray":
                return "border-gray-400 text-gray-300 hover:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]";
            case "purple":
            default:
                return "border-purple text-purple hover:bg-purple/10 shadow-[0_0_15px_rgba(138,43,226,0.3)] hover:shadow-[0_0_25px_rgba(138,43,226,0.6)]";
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "px-6 py-2 rounded-md font-semibold tracking-wide border-2 transition-all duration-300 backdrop-blur-sm",
                getColors(),
                className
            )}
            {...(props as any)}
        >
            {children as React.ReactNode}
        </motion.button>
    );
}
