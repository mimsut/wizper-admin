export function ProgressRing({ percent = 0, size = 84, stroke = 9, color = 'var(--color-primary)', children, style }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.min(100, Math.max(0, percent));
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0, ...style }}>
      <svg width={size} height={size} viewBox={'0 0 ' + size + ' ' + size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={(c * p / 100) + ' ' + c} transform={'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')'}
          style={{ transition: 'stroke-dasharray var(--duration-base) var(--ease-standard)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
}
