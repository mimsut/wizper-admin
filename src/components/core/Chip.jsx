export function Chip({ tone = 'neutral', children, style }) {
  const tones = {
    primary: { background: 'var(--color-primary-weak)', color: 'var(--color-primary)' },
    success: { background: 'var(--color-success-weak)', color: 'var(--color-success)' },
    coin: { background: 'var(--reward-coin-weak)', color: 'var(--reward-coin)' },
    danger: { background: 'var(--color-danger-weak)', color: 'var(--color-danger)' },
    neutral: { background: 'var(--surface-sunken)', color: 'var(--text-sub)' }
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 24, padding: '0 8px', borderRadius: 'var(--radius-full)', font: '600 12px/1 var(--font-sans)', letterSpacing: 'var(--tracking-body)', background: t.background, color: t.color, whiteSpace: 'nowrap', ...style }}>{children}</span>
  );
}
