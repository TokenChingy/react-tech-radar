import "./styles.css";

import {
  TechRadarProps,
  TriggerBlipToolTipEvent,
  TriggerBlipToolTipEventName,
} from "./types";
import { useCallback, useEffect, useState } from "react";

import ToolTip from "./ToolTip";
import generateTechRadarData from "./utilities/generateTechRadarData";
import { getElementCoordinates } from "./utilities/getElementCoordinates";

export default function TechRadar({
  radarSize,
  blipRadius,
  slices,
  rings,
  styles = {},
  onBlipClick,
  onBlipMouseOver,
  onBlipMouseOut,
}: TechRadarProps) {
  // Default Variables
  const DEFAULT_PADDING = 16;
  const DEFAULT_RING_STROKE = "gray";
  const DEFAULT_RING_STROKE_WIDTH = 1;
  const DEFAULT_RING_TEXT_COLOR = "black";
  const DEFAULT_RING_FONT_SIZE = 16;
  const DEFAULT_RING_FONT_WEIGHT = "bold";
  const DEFAULT_FONT_FAMILY = "Arial, sans-serif";
  const DEFAULT_SLICE_STROKE = "black";
  const DEFAULT_SLICE_STROKE_WIDTH = 1;
  const DEFAULT_BLIP_STROKE = "white";
  const DEFAULT_BLIP_STROKE_WIDTH = 1;
  const DEFAULT_TOOLTIP_BG_COLOR = "rgba(0, 0, 0, 0.75)";
  const DEFAULT_TOOLTIP_COLOR = "white";
  const DEFAULT_TOOLTIP_FONT_SIZE = 12;

  // Use state for tooltip data
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    blipName: string;
    isVisible: boolean;
  }>({ x: 0, y: 0, blipName: "", isVisible: false });

  // Calculate radar padding and data
  const radarPadding = styles.padding || DEFAULT_PADDING;
  const radarData = generateTechRadarData({
    radarSize,
    blipRadius,
    slices,
    rings,
  });

  // Tooltip position calculation
  const tooltipPosition = {
    x: tooltipData.x,
    y: tooltipData.y - blipRadius * 2 - 4,
  };

  // Event handler for mouse over
  const handleMouseOver = useCallback(
    (blipId: string, blipName: string) => {
      const blipElement = document.querySelector(`circle#${blipId}`);
      const coordinates = getElementCoordinates(blipElement!);

      setTooltipData({
        x: coordinates.x - blipRadius / 2,
        y:
          coordinates.y + (styles.blipStrokeWidth ?? DEFAULT_BLIP_STROKE_WIDTH),
        blipName,
        isVisible: true,
      });
      if (onBlipMouseOver) onBlipMouseOver(blipId);
    },
    [blipRadius, onBlipMouseOver, styles.blipStrokeWidth]
  );

  // Event handler for mouse out
  const handleMouseOut = useCallback(
    (blipId: string) => {
      setTooltipData((prev) => ({ ...prev, isVisible: false }));
      if (onBlipMouseOut) onBlipMouseOut(blipId);
    },
    [onBlipMouseOut]
  );

  // Event handler for click
  const handleClick = useCallback(
    (blipId: string) => {
      if (onBlipClick) onBlipClick(blipId);
    },
    [onBlipClick]
  );

  // Effect to handle tooltip events
  useEffect(() => {
    function handleTriggerBlipToolTipEvent(event: TriggerBlipToolTipEvent) {
      const { blipId } = event.detail;
      const { blipName } = radarData.blipPositions.find(
        (blip) => blip.blipId === blipId
      )!;
      const blipElement = document.querySelector(`circle#${blipId}`);
      const coordinates = getElementCoordinates(blipElement!);

      setTooltipData({
        x: coordinates.x - radarPadding - blipRadius / 2,
        y:
          coordinates.y + (styles.blipStrokeWidth ?? DEFAULT_BLIP_STROKE_WIDTH),
        blipName,
        isVisible: true,
      });
    }

    document.addEventListener(
      TriggerBlipToolTipEventName,
      handleTriggerBlipToolTipEvent as EventListener
    );

    return () => {
      document.removeEventListener(
        TriggerBlipToolTipEventName,
        handleTriggerBlipToolTipEvent as EventListener
      );
    };
  }, [blipRadius, radarData, radarPadding, styles]);

  return (
    <div id="tech-radar" style={{ position: "relative" }}>
      <svg
        width={radarSize + radarPadding * 2}
        height={radarSize + radarPadding * 2}
        viewBox={`${-radarPadding} ${-radarPadding} ${
          radarSize + radarPadding * 2
        } ${radarSize + radarPadding * 2}`}
      >
        {/* Render rings with custom fill */}
        {radarData.rings.reverse().map((ring) => (
          <g key={ring.id} className={`tech-radar-ring`}>
            <circle
              cx={radarSize / 2}
              cy={radarSize / 2}
              r={ring.radius}
              fill={ring.fillColor || "transparent"}
              stroke={styles.ringStroke || DEFAULT_RING_STROKE}
              strokeWidth={styles.ringStrokeWidth || DEFAULT_RING_STROKE_WIDTH}
            />
            <text
              x={radarSize / 2}
              y={radarSize / 2 - ring.radius + 24}
              id={ring.id}
              textAnchor="middle"
              fill={styles.ringTextColor || DEFAULT_RING_TEXT_COLOR}
              fontSize={styles.ringFontSize || DEFAULT_RING_FONT_SIZE}
              fontFamily={styles.fontFamily || DEFAULT_FONT_FAMILY}
              fontWeight={styles.ringFontWeight || DEFAULT_RING_FONT_WEIGHT}
              className={`tech-radar-ring-text`}
            >
              {ring.name}
            </text>
          </g>
        ))}

        {/* Render slice radii */}
        {radarData.slices.map((slice) => {
          const { startAngle, endAngle, sliceId } = slice;

          // Calculate coordinates for radii
          const x1 = radarSize / 2 + (radarSize / 2) * Math.cos(startAngle);
          const y1 = radarSize / 2 - (radarSize / 2) * Math.sin(startAngle);
          const x2 = radarSize / 2 + (radarSize / 2) * Math.cos(endAngle);
          const y2 = radarSize / 2 - (radarSize / 2) * Math.sin(endAngle);

          return (
            <g key={sliceId} className={`tech-radar-slice`}>
              {/* Start angle radius */}
              <line
                x1={radarSize / 2}
                y1={radarSize / 2}
                x2={x1}
                y2={y1}
                stroke={styles.sliceStroke || DEFAULT_SLICE_STROKE}
                strokeWidth={
                  styles.sliceStrokeWidth || DEFAULT_SLICE_STROKE_WIDTH
                }
                className={`tech-radar-slice-line`}
              />
              {/* End angle radius */}
              <line
                x1={radarSize / 2}
                y1={radarSize / 2}
                x2={x2}
                y2={y2}
                stroke={styles.sliceStroke || DEFAULT_SLICE_STROKE}
                strokeWidth={
                  styles.sliceStrokeWidth || DEFAULT_SLICE_STROKE_WIDTH
                }
                className={`tech-radar-slice-line`}
              />
            </g>
          );
        })}

        {radarData.rings.reverse().map((ring) => (
          <use key={ring.id} xlinkHref={`#${ring.id}`} />
        ))}

        {/* Render blips with slice color */}
        {radarData.blipPositions.map((blip) => {
          const slice = slices.find((s) => s.id === blip.sliceId);
          const blipColor = slice ? slice.color : "black";

          return (
            <circle
              key={blip.blipId}
              id={blip.blipId}
              cx={radarSize / 2 + blip.x}
              cy={radarSize / 2 - blip.y}
              r={blipRadius}
              fill={blipColor}
              stroke={styles.blipStroke || DEFAULT_BLIP_STROKE}
              strokeWidth={styles.blipStrokeWidth || DEFAULT_BLIP_STROKE_WIDTH}
              className={`tech-radar-blip`}
              onClick={() => handleClick(blip.blipId)}
              onMouseOver={() => handleMouseOver(blip.blipId, blip.blipName)}
              onMouseOut={() => handleMouseOut(blip.blipId)}
            />
          );
        })}
      </svg>

      <ToolTip
        x={tooltipPosition.x}
        y={tooltipPosition.y}
        blipName={tooltipData.blipName}
        isVisible={tooltipData.isVisible}
        styles={{
          fontSize: styles.toolTipFontSize || DEFAULT_TOOLTIP_FONT_SIZE,
          fontFamily: styles.fontFamily || DEFAULT_FONT_FAMILY,
          backgroundColor:
            styles.toolTipBackgroundColor || DEFAULT_TOOLTIP_BG_COLOR,
          color: styles.toolTipTextColor || DEFAULT_TOOLTIP_COLOR,
        }}
      />
    </div>
  );
}
