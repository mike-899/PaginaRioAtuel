import { useState } from 'react'
import './App.css'

function HBoton({ texto = "Lorem", className = "", href = "#", z = 0}) {
  const radio = 30;
  const rectAncho = 150;
  const rectAltura = 60;
  const anchoTotal = radio * 2 + rectAncho;

  return (
    <a
      href={href}
      style={{
        marginLeft: `-${anchoTotal / 2}px`,
        marginTop: `-${radio}px`,
        zIndex: z
      }}
      className={`inline-block ${className}`}
    >
      <svg
        width={anchoTotal}
        height={radio * 2}
        className="overflow-visible"
      >
        {/* Círculo a la izquierda */}
        <circle
          cx={radio}
          cy={radio}
          r={radio}
          fill="#325C66"
          fillOpacity="0.43"
        />

        {/* Rectángulo con border radius */}
        <rect
          x={radio * 2}
          y={(radio * 2 - rectAltura) / 2}
          width={rectAncho}
          height={rectAltura}
          rx={30}
          ry={30}
          fill="#325C66"
          fillOpacity="0.43"
        />

        {/* Texto centrado en el rectángulo */}
        <text
          x={radio * 2 + rectAncho / 2}
          y={radio}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-circular font-bold text-3xl"
          fill="currentColor"
        >
          {texto}
        </text>
      </svg>
    </a>
  );
}

function Rio({
  className = "",
  z = 0,
  ancho = 2000,
  alto = 2000,
  grosor = 120,
  pathDataPercent = [
    { type: 'M', x: 0, y: 0.6 },
    { type: 'C', x1: 0.2, y1: 0.6, x2: 0.3, y2: 0.8, x: 0.5, y: 0.65 },
    { type: 'S', x2: 0.7, y2: 0.8, x: 0.9, y: 0.75 },
    { type: 'S', x2: 1.1, y2: 0.75, x: 1.3, y: 0.65 },
    { type: 'S', x2: 1.5, y2: 0.65, x: 2, y: 0.85 },
  ]
}) {
  // Convertir coordenadas porcentuales a absolutas
  const pathData = pathDataPercent.map(cmd => {
    switch(cmd.type) {
      case 'M':
        return `M ${cmd.x * ancho} ${cmd.y * alto}`;
      case 'C':
        return `C ${cmd.x1 * ancho} ${cmd.y1 * alto}, ${cmd.x2 * ancho} ${cmd.y2 * alto}, ${cmd.x * ancho} ${cmd.y * alto}`;
      case 'S':
        return `S ${cmd.x2 * ancho} ${cmd.y2 * alto}, ${cmd.x * ancho} ${cmd.y * alto}`;
      case 'Q':
        return `Q ${cmd.x1 * ancho} ${cmd.y1 * alto}, ${cmd.x * ancho} ${cmd.y * alto}`;
      case 'T':
        return `T ${cmd.x * ancho} ${cmd.y * alto}`;
      default:
        return '';
    }
  }).join(' ');

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        marginLeft: `-${ancho / 2}px`,
        marginTop: `-${alto / 2}px`,
        zIndex: z
      }}
    >
      <svg
        width={ancho}
        height={alto}
        className="overflow-visible"
      >
        {/* Definir pattern para la textura de agua */}
        <defs>
          <pattern
            id="waterTexture"
            patternUnits="userSpaceOnUse"
            width="350"
            height="350"
          >
            <image
              href="/assets/water-tile.webp"
              width="350"
              height="350"
            />
          </pattern>
        </defs>

        {/* Path con curvas y textura */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#waterTexture)"
          strokeWidth={grosor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Margen({
  radio = 550,
  grosorTrazo = 40,
  className = "",
  z = 0,
  circulos = [
    { angulo: 0, texto1: "Texto1", texto2: "Texto2" },
    { angulo: 120, texto1: "Texto3", texto2: "Texto4" },
    { angulo: 240, texto1: "Texto5", texto2: "Texto6" }
  ],
  clipPathPercent = null
}) {
  const radioInterno = radio - grosorTrazo / 2;
  const tamaño = (radio + grosorTrazo / 2) * 2;
  const radioCirculo = 95; // Radio de los círculos pequeños
  const centroX = tamaño / 2;
  const centroY = tamaño / 2;
  const FontStyle = "font-circular font-bold text-sm";

  // Convertir coordenadas porcentuales del clip path a absolutas
  const clipPathData = clipPathPercent ? clipPathPercent.map(cmd => {
    switch(cmd.type) {
      case 'M':
        return `M ${cmd.x * tamaño} ${cmd.y * tamaño}`;
      case 'C':
        return `C ${cmd.x1 * tamaño} ${cmd.y1 * tamaño}, ${cmd.x2 * tamaño} ${cmd.y2 * tamaño}, ${cmd.x * tamaño} ${cmd.y * tamaño}`;
      case 'S':
        return `S ${cmd.x2 * tamaño} ${cmd.y2 * tamaño}, ${cmd.x * tamaño} ${cmd.y * tamaño}`;
      case 'Q':
        return `Q ${cmd.x1 * tamaño} ${cmd.y1 * tamaño}, ${cmd.x * tamaño} ${cmd.y * tamaño}`;
      case 'T':
        return `T ${cmd.x * tamaño} ${cmd.y * tamaño}`;
      case 'L':
        return `L ${cmd.x * tamaño} ${cmd.y * tamaño}`;
      case 'Z':
        return 'Z';
      default:
        return '';
    }
  }).join(' ') : null;

  return (
    <div
       className={`inline-block ${className}`}
       style={{
       marginLeft: `-${tamaño / 2}px`,
       marginTop: `-${tamaño / 2}px`,
       zIndex: z
       }}
      >
      <svg
        width={tamaño}
        height={tamaño}
        className="overflow-visible"
      >
        {/* Definir clip path si se proporciona */}
        {clipPathData && (
          <defs>
            <clipPath id="margenClip">
              <path d={clipPathData} />
            </clipPath>
          </defs>
        )}

        {/* Círculo principal con trazo */}
        <circle
          cx={centroX}
          cy={centroY}
          r={radioInterno}
          fill="none"
          stroke="#56A3D0"
          strokeWidth={grosorTrazo}
          clipPath={clipPathData ? "url(#margenClip)" : undefined}
        />

        {/* Círculos con textos posicionados en ángulos específicos */}
        {circulos.map((circulo, index) => {
          const anguloRad = (circulo.angulo - 90) * (Math.PI / 180); // -90 para que 0° esté arriba
          const x = centroX + radioInterno * Math.cos(anguloRad);
          const y = centroY + radioInterno * Math.sin(anguloRad);

          return (
            <g key={index}>
              {/* Círculo pequeño */}
              <circle
                cx={x}
                cy={y}
                r={radioCirculo}
                fill="#325C66"
                fillOpacity="0.43"
              />

              {/* Texto línea 1 */}
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className={FontStyle}
                fill="currentColor"
              >
                {circulo.texto1}
              </text>

              {/* Texto línea 2 */}
              <text
                x={x}
                y={y + 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className={FontStyle}
                fill="currentColor"
              >
                {circulo.texto2}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Boton({ texto = "Lorem", ancho = 130, altura = 50, className = "", href = "#", z = 0}) {
  return (
    <a
      href={href}
      style={{
        marginLeft: `-${ancho / 2}px`,
        marginTop: `-${altura / 2}px`,
        zIndex: z
      }}
      className={`inline-block ${className}`}
    >
      <svg
        width={ancho}
        height={altura}
        className="overflow-visible"
      >
        <rect
          x="0"
          y="0"
          width={ancho}
          height={altura}
          rx={altura / 2}
          ry={altura / 2}
          fill="#325C66"
          fillOpacity="0.43"
        />
        <text
          x={ancho / 2}
          y={altura / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-circular font-bold text-3xl"
          fill="currentColor"
        >
          {texto}
        </text>
      </svg>
    </a>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-white text-left absolute top-25 left-7/20 leading-[0.8]">
        <span className="font-vegan">R </span><span className="font-roboto italic">io</span><br></br>
        <span className="font-vegan pl-30">A </span><span className="font-roboto italic">tuel</span>
      </h1>
      <Boton className="fixed top-20 left-2/6" texto="Lorem" />
      <Boton className="fixed top-20 left-3/6" texto="Lorem" />
      <Boton className="fixed top-20 left-4/6" texto="Lorem" />
      <Boton className="fixed top-15 left-15" texto="O" ancho={60} altura={60}/>
      <Boton className="fixed top-15 left-35" texto="O" ancho={60} altura={60}/>
      <Boton className="fixed top-15 left-55" texto="O" ancho={60} altura={60}/>
      <HBoton className="fixed top-20 left-5/6" texto="Lorem" />
      <Margen
        className="absolute top-200 left-5/20"
        z={0}
        circulos={[
          { angulo: 330, texto1: "Norte", texto2: "Top" },
          { angulo: 55, texto1: "SurEste", texto2: "Bottom" },
          { angulo: 90, texto1: "SurOeste", texto2: "Left" }
        ]}
        clipPathPercent={[
          { type: 'M', x: 0, y: 0 },
          { type: 'L', x: 1, y: 0 },
          { type: 'L', x: 1, y: 0.5 },
          { type: 'C', x1: 0.7, y1: 0.55, x2: 0.3, y2: 0.75, x: 0, y: 0.55 },
          { type: 'Z' }
        ]}
      />
      <Rio className="absolute top-200 left-5/20" z={1} />
    </>
  )
}

export default App
