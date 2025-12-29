function use3DBorder(rotateX: number, rotateY: number) {
  const radX = (rotateX * Math.PI) / 180;
  const radY = (rotateY * Math.PI) / 180;

  const base = 4; // px
  const depth = 1; // förstärkning av 3D-effekten

  // Höger/vänster påverkas av rotateY
  const right = base + depth * Math.sin(radY) * base;
  const left = base - depth * Math.sin(radY) * base;

  // Topp/botten påverkas av rotateX
  const bottom = base + depth * Math.sin(radX) * base;
  const top = base - depth * Math.sin(radX) * base;

  // Clamp så vi aldrig får negativa värden
  const clamp = (v: number) => Math.max(1, v);

  return {
    borderRight: `${clamp(right)}px`,
    borderLeft: `${clamp(left)}px`,
    borderBottom: `${clamp(bottom)}px`,
    borderTop: `${clamp(top)}px`,
  };
}

export default use3DBorder;
