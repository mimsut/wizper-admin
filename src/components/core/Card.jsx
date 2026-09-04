import React from 'react';
export function Card({ children, onClick, padding = 20, style }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onPointerDown={onClick ? () => setPressed(true) : undefined}
      onPointerUp={onClick ? () => setPressed(false) : undefined}
      onPointerLeave={onClick ? () => setPressed(false) : undefined}
      style={{
        background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', padding,
        cursor: onClick ? 'pointer' : undefined,
        transform: pressed ? 'scale(0.985)' : 'scale(1)',
        transition: 'transform var(--duration-fast) var(--ease-standard)',
        ...style
      }}
    >{children}</div>
  );
}
