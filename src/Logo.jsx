export const LogoInline = ({ size = "md", dark = true }) => {
  const gold = "#d4af37";
  const white = dark ? "#e8e0d0" : "#fff8ee";
  const configs = {
    sm:  { w: 100, h: 36, enkajeSz: 14, proSz: 7, enkajey: 28, proy: 35 },
    nav: { w: 130, h: 46, enkajeSz: 18, proSz: 8, enkajey: 36, proy: 44 },
    md:  { w: 160, h: 56, enkajeSz: 22, proSz: 10, enkajey: 44, proy: 54 },
    lg:  { w: 220, h: 76, enkajeSz: 30, proSz: 13, enkajey: 60, proy: 74 },
  };
  const c = configs[size] || configs.md;
  return (
    <svg viewBox={`0 0 ${c.w} ${c.h}`} style={{ height: c.h, width: "auto" }} xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width={c.w} height={c.h*0.10} rx={c.h*0.05} fill={gold} opacity="1"/>
      <rect x={c.w*0.04} y={c.h*0.14} width={c.w*0.92} height={c.h*0.08} rx={c.h*0.04} fill={gold} opacity="0.65"/>
      <rect x={c.w*0.08} y={c.h*0.26} width={c.w*0.84} height={c.h*0.07} rx={c.h*0.035} fill={gold} opacity="0.4"/>
      <rect x={c.w*0.12} y={c.h*0.36} width={c.w*0.76} height={c.h*0.05} rx={c.h*0.025} fill={gold} opacity="0.2"/>
      <text x={c.w/2} y={c.enkajey} textAnchor="middle" fontFamily="Georgia,serif" fontSize={c.enkajeSz} fontWeight="900" fill={white} stroke={gold} strokeWidth="0.8" paintOrder="stroke" letterSpacing="2">EnKaje</text>
      <text x={c.w/2} y={c.proy} textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize={c.proSz} fontWeight="700" fill={gold} letterSpacing="4">PRO</text>
    </svg>
  );
};

export default LogoInline;
