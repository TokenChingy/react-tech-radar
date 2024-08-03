type ToolTipProps = {
  x: number;
  y: number;
  blipName: string;
  isVisible: boolean;
  styles?: {
    fontSize?: number;
    fontFamily?: string;
    backgroundColor?: string;
    color?: string;
  };
};

export default function ToolTip({
  x,
  y,
  blipName,
  isVisible,
  styles,
}: ToolTipProps) {
  if (!isVisible) return null;

  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    backgroundColor: styles?.backgroundColor || "rgba(0, 0, 0, 0.75)",
    color: styles?.color || "white",
    padding: "5px 10px",
    borderRadius: "5px",
    pointerEvents: "none",
    transform: "translate(-50%, -100%)",
    whiteSpace: "nowrap",
    fontFamily: styles?.fontFamily || "Arial, sans-serif",
    fontSize: styles?.fontSize || 12,
  };

  return (
    <div className="tech-radar-tooltip" style={tooltipStyle}>
      {blipName}
    </div>
  );
}
