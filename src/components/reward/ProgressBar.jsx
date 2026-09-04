export function ProgressBar({ value = 0, max = 100, height = 8, color = 'var(--color-primary)', style }) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div style={{ height, borderRadius: height / 2, background: 'var(--surface-sunken)', overflow: 'hidden', ...style }}>
      <div style={{ width: pct + '%', height: '100%', borderRadius: height / 2, background: color, transition: 'width var(--duration-base) var(--ease-standard)' }} />
    </div>
  );
}
