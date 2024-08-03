import { Ring, Slice } from "./components/TechRadar";

import TechRadar from "./components/TechRadar";

const slices: Slice[] = [
  {
    id: "1",
    name: "Adopt",
    color: "#f44336", // Red
    blips: [
      { id: "blip1", name: "React", ringId: "1" },
      { id: "blip2", name: "Vue", ringId: "2" },
      { id: "blip3", name: "TypeScript", ringId: "3" },
      { id: "blip4", name: "GraphQL", ringId: "1" },
    ],
  },
  {
    id: "2",
    name: "Trial",
    color: "#2196f3", // Blue
    blips: [
      { id: "blip5", name: "Angular", ringId: "2" },
      { id: "blip6", name: "Svelte", ringId: "3" },
      { id: "blip7", name: "Next.js", ringId: "1" },
      { id: "blip8", name: "Nuxt.js", ringId: "2" },
    ],
  },
  {
    id: "3",
    name: "Assess",
    color: "#4caf50", // Green
    blips: [
      { id: "blip9", name: "Flutter", ringId: "1" },
      { id: "blip10", name: "SwiftUI", ringId: "2" },
      { id: "blip11", name: "Kotlin", ringId: "3" },
      { id: "blip12", name: "Rust", ringId: "1" },
    ],
  },
  {
    id: "4",
    name: "Hold",
    color: "#ffeb3b", // Yellow
    blips: [
      { id: "blip13", name: "PHP", ringId: "2" },
      { id: "blip14", name: "jQuery", ringId: "3" },
      { id: "blip15", name: "Backbone.js", ringId: "1" },
      { id: "blip16", name: "Django", ringId: "2" },
    ],
  },
];

const rings: Ring[] = [
  { id: "1", name: "ADOPT", fillColor: "#666666" },
  { id: "2", name: "TRIAL", fillColor: "#999999" },
  { id: "3", name: "ASSESS", fillColor: "#CCCCCC" },
  { id: "4", name: "HOLD", fillColor: "transparent" },
];

const App = () => {
  const handleBlipClick = (blipId: string) => {
    alert(`Clicked on blip: ${blipId}`);
  };

  const handleBlipMouseOver = (blipId: string) => {
    console.log(`Hovered over blip: ${blipId}`);
  };

  const handleBlipMouseOut = (blipId: string) => {
    console.log(`Mouse out from blip: ${blipId}`);
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <TechRadar
        radarSize={640}
        blipRadius={6}
        slices={slices}
        rings={rings}
        styles={{
          padding: 4,
          fontFamily: "Arial, sans-serif",
          ringStroke: "#333333",
          ringStrokeWidth: 0.5,
          ringTextColor: "rgba(0, 0, 0, 0.5)",
          ringFontSize: 16,
          ringFontWeight: "bolder",
          sliceStroke: "#333333",
          sliceStrokeWidth: 0.25,
          blipStroke: "#333333",
          blipStrokeWidth: 0.75,
          toolTipTextColor: "#FFFFFF",
          toolTipFontSize: 12,
          toolTipBackgroundColor: "rgba(0, 0, 0, 0.75)",
        }}
        onBlipClick={handleBlipClick}
        onBlipMouseOver={handleBlipMouseOver}
        onBlipMouseOut={handleBlipMouseOut}
      />
    </div>
  );
};

export default App;
