'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Persona } from '@/types';
import styles from '@/styles/PersonaSelector.module.scss';

interface PersonaSelectorProps {
  personas: Persona[];
  onSelectPersona: (persona: Persona) => void;
  onCancel: () => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  personas,
  onSelectPersona,
  onCancel
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={onCancel} />
      
      <motion.div 
        className={styles.modal}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <h2 className={styles.title}>Choose a Chat Persona</h2>
        <p className={styles.subtitle}>Select the personality type for this conversation</p>
        
        <div className={styles.personaGrid}>
          {personas.map(persona => (
            <motion.div
              key={persona.id}
              className={styles.personaCard}
              onClick={() => onSelectPersona(persona)}
              whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.personaAvatar}>
                <img src={persona.avatar} alt={persona.name} />
              </div>
              <h3 className={styles.personaName}>{persona.name}</h3>
              <p className={styles.personaDescription}>{persona.description}</p>
            </motion.div>
          ))}
        </div>
        
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

export default PersonaSelector; 