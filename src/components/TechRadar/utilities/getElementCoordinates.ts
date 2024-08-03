export function getElementCoordinates(element: Element): {
  x: number;
  y: number;
} {
  if (!element) return { x: 0, y: 0 };

  const rect = element.getBoundingClientRect();
  const x = rect.left + window.scrollX;
  const y = rect.top + window.scrollY;

  return { x, y };
}
