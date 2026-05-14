import { useState } from 'react';
import { motion } from 'framer-motion';
import { SiKotlin } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';

function KotlinPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  return (
    <div className="flex items-center justify-center h-64">
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center gap-3 text-violet-400">
        <SiKotlin className="w-12 h-12" />
        <p className="text-slate-400">{tx('Cargando Kotlin Pro...', 'Loading Kotlin Pro...')}</p>
      </motion.div>
    </div>
  );
}

export default KotlinPro;
