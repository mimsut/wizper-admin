import React from 'react';
export function Button({ variant = 'primary', size = 'md', fullWidth = false, disabled = false, onClick, children, style }) {
  const [pressed, setPressed] = React.useState(false);
  const sizes = {
    lg: { height: 56, padding: '0 20px', font: '600 17px/1 var(--font-sans)', radius: 'var(--radius-lg)' },
    md: { height: 48, padding: '0 18px', font: '600 15px/1 var(--font-sans)', radius: 'var(--radius-md)' },
    sm: { height: 34, padding: '0 12px', font: '600 13px/1 var(--font-sans)', radius: 'var(--radius-sm)' }
  };
  const variants = {
    primary: { background: pressed ? 'var(--color-primary-pressed)' : 'var(--color-primary)', color: 'var(--color-on-primary)' },
    secondary: { background: 'var(--color-primary-weak)', color: 'var(--color-primary)' },
    neutral: { background: 'var(--surface-sunken)', color: 'var(--text-body)' },
    ghost: { background: 'transparent', color: 'var(--text-sub)' }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      disabled={disabled}
      style={{
        border: 'none', cursor: disabled ? 'default' : 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        width: fullWidth ? '100%' : undefined,
        height: s.height, padding: s.padding, font: s.font, borderRadius: s.radius,
        letterSpacing: 'var(--tracking-body)',
        background: disabled ? 'var(--surface-sunken)' : v.background,
        color: disabled ? 'var(--text-disabled)' : v.color,
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)',
        ...style
      }}
    >{children}</button>
  );
}
