import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FadeInProps = {
  duration: number;
};

const FadeIn: React.FC<FadeInProps> = ({ children, duration }) => {
  const transition = duration ? { duration: duration } : {};
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeIn;
