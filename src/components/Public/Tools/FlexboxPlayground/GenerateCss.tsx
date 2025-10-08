import { Button } from "@/components/ui/button";

export default function GeneratedCSS({ properties }: any) {
  const css = `
/* Flex container */
display: flex;
flex-direction: ${properties.flexDirection};
flex-wrap: ${properties.flexWrap};
justify-content: ${properties.justifyContent};
align-items: ${properties.alignItems};
align-content: ${properties.alignContent};
gap: ${properties.gap};
`;

  const copyToClipboard = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">Generated CSS</div>
        <Button size="sm" variant="outline" onClick={copyToClipboard}>
          Copy CSS
        </Button>
      </div>
      <pre className="bg-[#1b1b1b] border border-neutral-700 rounded-lg p-4 text-sm overflow-x-auto text-neutral-300 whitespace-pre">
        {css}
      </pre>
    </div>
  );
}
