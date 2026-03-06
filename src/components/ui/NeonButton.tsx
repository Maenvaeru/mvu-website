"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "purple" | "gold" | "softgray" | "orange";
}

export function NeonButton({ children, className, variant = "purple", ...props }: NeonButtonProps) {
    const getColors = () => {
        switch (variant) {
            case "gold":
                return "border-gold text-gold hover:bg-gold/10 shadow-[0_0_15px_var(--color-glow-gold)] hover:shadow-[0_0_25px_var(--color-glow-gold)]";
            case "orange":
                return "border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600]/10 shadow-[0_0_15px_var(--color-glow-orange)] hover:shadow-[0_0_25px_var(--color-glow-orange)]";
            case "softgray":
                return "border-gray-400 text-muted hover:bg-glass-bg shadow-[0_0_15px_var(--color-glass-border)] hover:shadow-[0_0_25px_var(--color-glass-border)]";
            case "purple":
            default:
                return "border-purple text-purple hover:bg-purple/10 shadow-[0_0_15px_var(--color-glow-purple)] hover:shadow-[0_0_25px_var(--color-glow-purple)]";
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
