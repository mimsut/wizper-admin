export function ListRow({ left, title, subtitle, right, muted = false, onClick, style }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, padding: '8px 0', cursor: onClick ? 'pointer' : undefined, opacity: muted ? 0.55 : 1, ...style }}>
      {left}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: 'var(--text-body1)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-body)' }}>{title}</div>
        {subtitle ? <div style={{ font: 'var(--text-caption)', color: 'var(--text-sub)', marginTop: 2 }}>{subtitle}</div> : null}
      </div>
      {right}
    </div>
  );
}
