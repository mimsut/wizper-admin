export function Amount({ value, size = 'md', color = 'var(--text-strong)', suffix = '원', style }) {
  const sizes = {
    display: { num: '700 32px/40px var(--font-sans)', unit: '600 20px/28px var(--font-sans)' },
    lg: { num: '700 22px/28px var(--font-sans)', unit: '500 16px/24px var(--font-sans)' },
    md: { num: '700 17px/24px var(--font-sans)', unit: '500 14px/20px var(--font-sans)' },
    sm: { num: '600 15px/22px var(--font-sans)', unit: '400 13px/18px var(--font-sans)' }
  };
  const s = sizes[size] || sizes.md;
  return (
    <span style={{ whiteSpace: 'nowrap', letterSpacing: 'var(--tracking-tight)', ...style }}>
      <span style={{ font: s.num, color, fontVariantNumeric: 'tabular-nums' }}>{Number(value).toLocaleString('ko-KR')}</span>
      <span style={{ font: s.unit, color: 'var(--text-sub)' }}>{suffix}</span>
    </span>
  );
}
