import {
  ArcSlice,
  BlipPosition,
  TechRadarInput,
  TechRadarOutput,
} from "../types";

import calculatePolarCoordinates from "./calculatePolarCoordinates";
import seededRandom from "./seededRandom";

/**
 * Generate tech radar data without external libraries.
 * @param input - The input configuration for the tech radar.
 * @returns The generated tech radar data.
 */
export default function generateTechRadarData(
  input: TechRadarInput
): TechRadarOutput {
  const { radarSize, blipRadius, slices, rings } = input;
  const sliceCount = slices.length;
  const sliceAngle = (2 * Math.PI) / sliceCount;
  const rng = seededRandom(42);

  const ringSizes = rings.map((ring, index) => ({
    id: ring.id,
    name: ring.name,
    radius: (radarSize / 2 / rings.length) * (index + 1),
    fillColor: ring.fillColor,
  }));

  const arcSlices: ArcSlice[] = slices.map((slice, index) => ({
    sliceId: slice.id,
    startAngle: index * sliceAngle,
    endAngle: (index + 1) * sliceAngle,
  }));

  const blipPositions: BlipPosition[] = [];

  slices.forEach((slice, sliceIndex) => {
    const { startAngle, endAngle } = arcSlices[sliceIndex];
    const blips = slice.blips;

    blips.forEach((blip) => {
      const ringIndex = rings.findIndex((ring) => ring.id === blip.ringId);
      if (ringIndex === -1) return;

      // Adjusted to account for blipRadius
      const innerRadius = ringSizes[ringIndex].radius + blipRadius;
      const outerRadius =
        (ringSizes[ringIndex + 1]?.radius || radarSize / 2) - blipRadius;

      for (let attempts = 0; attempts < 10; attempts++) {
        const distance = innerRadius + rng() * (outerRadius - innerRadius);
        const angle = startAngle + rng() * (endAngle - startAngle);

        const { x, y } = calculatePolarCoordinates(angle, distance);

        // Ensure no overlapping blips and not too close to slice radii
        if (
          !blipPositions.some(
            (existingBlip) =>
              existingBlip.sliceId === slice.id &&
              Math.hypot(existingBlip.x - x, existingBlip.y - y) <
                blipRadius * 2.2
          ) &&
          Math.abs(angle - startAngle) > 0.1 &&
          Math.abs(angle - endAngle) > 0.1
        ) {
          blipPositions.push({
            blipId: blip.id,
            blipName: blip.name,
            sliceId: slice.id,
            ringId: blip.ringId,
            x,
            y,
          });
          break;
        }
      }
    });
  });

  return {
    rings: ringSizes,
    blipPositions,
    slices: arcSlices,
  };
}
