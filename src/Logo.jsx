export const LogoSVG = ({ size = "md", dark = true }) => {
  const sizes = {
    sm: { wood1: 50, wood2: 8, wood3: 6, wood4: 5, wood5: 3, enkaje: 15, pro: 8, gap: 3 },
    md: { wood1: 90, wood2: 7, wood3: 5, wood4: 4, wood5: 3, enkaje: 22, pro: 10, gap: 4 },
    lg: { wood1: 180, wood2: 12, wood3: 10, wood4: 8, wood5: 6, enkaje: 46, pro: 14, gap: 6 },
  };
  const s = sizes[size] || sizes.md;
  const gold = "#d4af37";
  const white = dark ? "#e8e0d0" : "#fff8ee";
  const goldDark = dark ? "#d4af37" : "#8B6914";
  const whiteDark = dark ? "#e8e0d0" : "#fff8ee";

  return (
    <svg viewBox={`0 0 ${s.wood1 + 20} ${s.enkaje + s.pro + s.gap + 22}`}
      style={{ height: size === "lg" ? 90 : size === "md" ? 52 : 32, width: "auto" }}
      xmlns="http://www.w3.org/2000/svg">
      {/* Vetas madera */}
      <rect x="0" y="0" width={s.wood1} height={s.wood2} rx={s.wood2/2} fill={goldDark} opacity="1"/>
      <rect x={s.wood1*0.05} y={s.wood2+2} width={s.wood1*0.9} height={s.wood3} rx={s.wood3/2} fill={goldDark} opacity="0.65"/>
      <rect x={s.wood1*0.10} y={s.wood2+s.wood3+4} width={s.wood1*0.80} height={s.wood4} rx={s.wood4/2} fill={goldDark} opacity="0.4"/>
      <rect x={s.wood1*0.15} y={s.wood2+s.wood3+s.wood4+6} width={s.wood1*0.70} height={s.wood5} rx={s.wood5/2} fill={goldDark} opacity="0.2"/>
      {/* EnKaje */}
      <text
        x={s.wood1/2} y={s.wood2+s.wood3+s.wood4+s.wood5+8+s.enkaje}
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize={s.enkaje}
        fontWeight="900"
        fill={white}
        stroke={gold}
        strokeWidth={size === "lg" ? "1.2" : "0.8"}
        paintOrder="stroke"
        letterSpacing={size === "lg" ? "3" : "1"}
      >EnKaje</text>
      {/* Linea */}
      <line
        x1={s.wood1*0.15} y1={s.wood2+s.wood3+s.wood4+s.wood5+10+s.enkaje+2}
        x2={s.wood1*0.85} y2={s.wood2+s.wood3+s.wood4+s.wood5+10+s.enkaje+2}
        stroke={gold} strokeWidth="0.5" opacity="0.4"
      />
      {/* PRO */}
      <text
        x={s.wood1/2} y={s.wood2+s.wood3+s.wood4+s.wood5+12+s.enkaje+s.gap+s.pro}
        textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        fontSize={s.pro}
        fontWeight="700"
        fill={gold}
        stroke={whiteDark}
        strokeWidth="0.5"
        paintOrder="stroke"
        letterSpacing={size === "lg" ? "6" : "4"}
      >PRO</text>
    </svg>
  );
};

export default LogoSVG;

export const LogoInline = ({ size = "md", dark = true }) => {
  const gold = "#d4af37";
  const white = dark ? "#e8e0d0" : "#fff8ee";
  const configs = {
    sm: { w: 110, h: 32, wy: [0,7,13,18], wh: [5,4,3,2], wx: [0,4,8,12], ww: [110,100,90,80], ey: 28, ps: 7, py: 30 },
    md: { w: 160, h: 48, wy: [0,9,17,24], wh: [7,6,5,3], wx: [0,6,12,18], ww: [160,148,136,124], ey: 42, ps: 9, py: 44 },
    lg: { w: 220, h: 68, wy: [0,13,24,34], wh: [10,8,7,5], wx: [0,8,16,24], ww: [220,204,188,172], ey: 58, ps: 12, py: 62 },
    nav: { w: 130, h: 38, wy: [0,7,13,18], wh: [5,4,3,2], wx: [0,4,8,12], ww: [130,120,110,100], ey: 32, ps: 7.5, py: 34 },
  };
  const c = configs[size] || configs.md;
  const enkajeSz = size === "lg" ? 28 : size === "md" ? 20 : size === "nav" ? 16 : 13;
  return (
    <svg viewBox={`0 0 ${c.w} ${c.h}`} style={{ height: c.h, width: "auto" }} xmlns="http://www.w3.org/2000/svg">
      {c.wy.map((y, i) => (
        <rect key={i} x={c.wx[i]} y={y} width={c.ww[i]} height={c.wh[i]} rx={c.wh[i]/2} fill={gold} opacity={[1, 0.65, 0.4, 0.2][i]}/>
      ))}
      <text x={c.w/2} y={c.ey} textAnchor="middle" fontFamily="Georgia,serif" fontSize={enkajeSz} fontWeight="900" fill={white} stroke={gold} strokeWidth="0.9" paintOrder="stroke" letterSpacing="2">EnKaje</text>
      <line x1={c.w*0.1} y1={c.ey+2} x2={c.w*0.9} y2={c.ey+2} stroke={gold} strokeWidth="0.4" opacity="0.4"/>
      <text x={c.w/2} y={c.py} textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize={c.ps} fontWeight="700" fill={gold} stroke={white} strokeWidth="0.4" paintOrder="stroke" letterSpacing="4">PRO</text>
    </svg>
  );
};
