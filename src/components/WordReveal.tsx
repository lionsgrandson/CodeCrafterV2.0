import { motion } from 'motion/react'

type WordRevealProps = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function WordReveal({
  text,
  className = '',
  as: Tag = 'h2',
}: WordRevealProps) {
  const words = text.trim().split(/\s+/)

  return (
    <Tag className={`word-reveal ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden='true'
          className='word-reveal-item'
          initial={{ opacity: 1, y: '0.2em' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: 0.22,
            delay: index * 0.16,
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
      <motion.span
        aria-hidden='true'
        className='word-reveal-cursor'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1, 1, 0] }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: words.length * 0.16,
          repeat: 2,
        }}
      />
    </Tag>
  )
}
