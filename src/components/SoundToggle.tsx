'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/context/SoundContext';

export default function SoundToggle() {
    const { isSoundEnabled, toggleSound } = useSound();

    return (
        <motion.button
            onClick={toggleSound}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 left-6 z-[9998] p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label={isSoundEnabled ? "Mute Sound" : "Enable Sound"}
        >
            {isSoundEnabled ? (
                <Volume2 className="w-5 h-5 text-green-400" />
            ) : (
                <VolumeX className="w-5 h-5 text-red-400" />
            )}
        </motion.button>
    );
}
