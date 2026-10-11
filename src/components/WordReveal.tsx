// Retain the shared heading API without delaying readable content or loading an animation runtime.
type WordRevealProps = { text: string; className?: string; as?: 'h1' | 'h2' | 'h3' }
export function WordReveal({ text, className = '', as: Tag = 'h2' }: WordRevealProps) {
  return <Tag className={className}>{text}</Tag>
}
