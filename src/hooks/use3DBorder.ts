function use3DBorder(rotateX: number, rotateY: number) {
  const radX = (rotateX * Math.PI) / 180;
  const radY = (rotateY * Math.PI) / 180;

  const base = 1; // px
  const depth = 8; // förstärkning av 3D-effekten
  const threshold = 0.2; // när kanten ska döljas helt

  // Höger/vänster påverkas av rotateY
  const rightRaw = base + depth * Math.sin(radY) * base;
  const leftRaw = base - depth * Math.sin(radY) * base;

  // Topp/botten påverkas av rotateX
  const topRaw = base + depth * Math.sin(radX) * base;
  const bottomRaw = base - depth * Math.sin(radX) * base;

  // Dölj kanter som lutar bort från kameran
  const hideIfNegative = (v: number) => (v < threshold ? 0 : v);

  return {
    borderRight: `${hideIfNegative(rightRaw)}px`,
    borderLeft: `${hideIfNegative(leftRaw)}px`,
    borderBottom: `${hideIfNegative(bottomRaw)}px`,
    borderTop: `${hideIfNegative(topRaw)}px`,
  };
}

export default use3DBorder;
