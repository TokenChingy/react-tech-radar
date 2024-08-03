export default function calculatePolarCoordinates(
  angle: number,
  distance: number
) {
  return {
    x: distance * Math.cos(angle),
    y: distance * Math.sin(angle),
  };
}
