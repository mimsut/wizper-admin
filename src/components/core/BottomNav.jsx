import { Icon } from './Icon.jsx';
export function BottomNav({ items, activeIndex = 0, onChange, style }) {
  return (
    <nav style={{ display: 'flex', background: 'var(--surface-card)', borderTop: '1px solid var(--divider)', height: 60, ...style }}>
      {items.map((it, i) => {
        const active = i === activeIndex;
        return (
          <button key={i} onClick={() => onChange && onChange(i)} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, color: active ? 'var(--text-strong)' : 'var(--text-weak)', transition: 'color var(--duration-fast) var(--ease-standard)' }}>
            <Icon name={it.icon} size={22} />
            <span style={{ font: (active ? '600' : '500') + ' 11px/1 var(--font-sans)' }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
