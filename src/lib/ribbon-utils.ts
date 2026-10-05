import { RibbonConfig } from "@/components/Public/Tools/RibbonGenerator/ribbon-types";

export function generateRibbonCSS(config: RibbonConfig) {
  const { type, color, height, position } = config;

  if (type === "corner") {
    return `
.ribbon{
 position:absolute;
 ${position}: -10px;
 top: 10px;
 background:${color};
 height:${height}px;
 padding:0 20px;
 transform:rotate(${position === "left" ? "-45deg" : "45deg"});
 color:white;
}
`;
  }

  if (type === "top") {
    return `
.ribbon{
 position:absolute;
 top:0;
 ${position}:0;
 background:${color};
 height:${height}px;
 padding:0 20px;
 color:white;
}
`;
  }

  if (type === "side") {
    return `
.ribbon{
 position:absolute;
 top:50%;
 ${position}:0;
 background:${color};
 height:${height}px;
 transform:translateY(-50%);
 color:white;
 padding:0 20px;
}
`;
  }

  return "";
}
