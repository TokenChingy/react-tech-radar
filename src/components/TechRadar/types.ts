export type Slice = {
  id: string;
  name: string;
  color: string; // Color for blips within this slice
  blips: Blip[];
};

export type Blip = {
  id: string;
  name: string;
  ringId: string;
};

export type Ring = {
  id: string;
  name: string;
  fillColor: string;
};

export type BlipPosition = {
  blipId: string;
  blipName: string;
  sliceId: string;
  ringId: string;
  x: number;
  y: number;
};

export type TechRadarInput = {
  radarSize: number;
  blipRadius: number;
  slices: Slice[];
  rings: Ring[];
};

export type ArcSlice = {
  sliceId: string;
  startAngle: number;
  endAngle: number;
};

export type TechRadarOutput = {
  rings: { id: string; radius: number; name: string; fillColor: string }[];
  blipPositions: BlipPosition[];
  slices: ArcSlice[];
};

// Define additional styles for customization
export type TechRadarStyles = {
  padding?: number;
  fontFamily?: string;
  ringStroke?: string;
  ringStrokeWidth?: number;
  ringTextColor?: string;
  ringFontSize?: number;
  ringFontWeight?: string;
  sliceStroke?: string;
  sliceStrokeWidth?: number;
  blipStroke?: string;
  blipStrokeWidth?: number;
  toolTipTextColor?: string;
  toolTipFontSize?: number;
  toolTipBackgroundColor?: string;
};

export type TechRadarProps = {
  radarSize: number;
  blipRadius: number;
  slices: Slice[];
  rings: Ring[];
  styles?: TechRadarStyles; // Allow for customization of various styles
  onBlipClick?: (blipId: string) => void;
  onBlipMouseOver?: (blipId: string) => void;
  onBlipMouseOut?: (blipId: string) => void;
};

export const TriggerBlipToolTipEventName = "TriggerBlipToolTipEvent";

export type TriggerBlipToolTipEvent = CustomEvent<{ blipId: string }>;
