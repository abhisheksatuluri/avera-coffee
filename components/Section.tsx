import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id, delay = 0 }) => {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;