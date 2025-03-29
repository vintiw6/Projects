export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <>
      {/* Subheader with larger font size, right alignment, increased word spacing, reddish-brown color, and margin-bottom */}
      <h3 className="text-left text-orange-700 font-semibold text-xl leading-4 tracking-wider mb-4">
        {subHeader}
      </h3>

      {/* Main header with right alignment, no italic, and default font style */}
      <h2 className="text-left text-black font-bold text-4xl">
        {mainHeader}
      </h2>
    </>
  );
}