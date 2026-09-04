export function Icon({ name, size = 20, color = 'currentColor', style }) {
  const url = 'https://unpkg.com/lucide-static@0.462.0/icons/' + name + '.svg';
  const m = 'url(' + url + ') no-repeat center / contain';
  return (
    <span aria-hidden="true" style={{ display: 'inline-block', width: size, height: size, backgroundColor: color, WebkitMask: m, mask: m, flexShrink: 0, ...style }} />
  );
}
