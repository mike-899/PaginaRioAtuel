import { useState } from 'react'
import './App.css'

function HBoton({ text = "Lorem", className = "", href = "#", z = 0}) {
  const radius = 30;
  const rectWidth = 150;
  const rectHeight = 60;
  const totalWidth = radius * 2 + rectWidth;

  return (
    <a
      href={href}
      style={{
        marginLeft: `-${totalWidth / 2}px`,
        marginTop: `-${radius}px`,
        zIndex: z
      }}
      className={`inline-block ${className}`}
    >
      <svg
        width={totalWidth}
        height={radius * 2}
        className="overflow-visible"
      >
        {/* Circle on the left */}
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="var(--color-teal-dark)"
          fillOpacity="0.43"
        />

        {/* Rectangle with border radius */}
        <rect
          x={radius * 2}
          y={(radius * 2 - rectHeight) / 2}
          width={rectWidth}
          height={rectHeight}
          rx={30}
          ry={30}
          fill="var(--color-teal-dark)"
          fillOpacity="0.43"
        />

        {/* Text centered in the rectangle */}
        <text
          x={radius * 2 + rectWidth / 2}
          y={radius}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-circular font-bold text-3xl"
          fill="currentColor"
        >
          {text}
        </text>
      </svg>
    </a>
  );
}

function Rio({
  className = "",
  z = 0,
  width = 2000,
  height = 2000,
  thickness = 120,
  pathDataPercent = [
    { type: 'M', x: 0, y: 0.6 },
    { type: 'C', x1: 0.2, y1: 0.6, x2: 0.3, y2: 0.8, x: 0.5, y: 0.65 },
    { type: 'S', x2: 0.7, y2: 0.8, x: 0.9, y: 0.75 },
    { type: 'S', x2: 1.1, y2: 0.75, x: 1.3, y: 0.65 },
    { type: 'S', x2: 1.5, y2: 0.65, x: 2, y: 0.85 },
  ]
}) {
  // Convert percentage coordinates to absolute
  const pathData = pathDataPercent.map(cmd => {
    switch(cmd.type) {
      case 'M':
        return `M ${cmd.x * width} ${cmd.y * height}`;
      case 'C':
        return `C ${cmd.x1 * width} ${cmd.y1 * height}, ${cmd.x2 * width} ${cmd.y2 * height}, ${cmd.x * width} ${cmd.y * height}`;
      case 'S':
        return `S ${cmd.x2 * width} ${cmd.y2 * height}, ${cmd.x * width} ${cmd.y * height}`;
      case 'Q':
        return `Q ${cmd.x1 * width} ${cmd.y1 * height}, ${cmd.x * width} ${cmd.y * height}`;
      case 'T':
        return `T ${cmd.x * width} ${cmd.y * height}`;
      default:
        return '';
    }
  }).join(' ');

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        marginLeft: `-${width / 2}px`,
        marginTop: `-${height / 2}px`,
        zIndex: z
      }}
    >
      <svg
        width={width}
        height={height}
        className="overflow-visible"
      >
        {/* Define pattern for water texture */}
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

          {/* Path for the text */}
          <path
            id="riverPath"
            d={pathData}
          />
        </defs>

        {/* Path with curves and texture */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#waterTexture)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Text following the path */}
        <text className="font-circular font-bold text-6xl" fill="currentColor" textAnchor="middle" dominantBaseline="middle">
          <textPath href="#riverPath" startOffset="0%" method="align" spacing="auto">
            From Mendoza - To Panama - From Mendoza - To Panama - From Mendoza - To Panama - From Mendoza - To Panama - From Mendoza - To Panama - From Mendoza - To Panama - From Mendoza - To Panama - From Mendoza - To Panama -
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function Margen({
  radius = 550,
  strokeWidth = 40,
  className = "",
  z = 0,
  circles = [
    { angle: 0, text1: "Text1", text2: "Text2" },
    { angle: 120, text1: "Text3", text2: "Text4" },
    { angle: 240, text1: "Text5", text2: "Text6" }
  ],
  clipPathPercent = null
}) {
  const innerRadius = radius - strokeWidth / 2;
  const size = (radius + strokeWidth / 2) * 2;
  const circleRadius = 95; // Radius of small circles
  const centerX = size / 2;
  const centerY = size / 2;
  const FontStyle = "font-circular font-bold text-sm";

  // Convert percentage coordinates of clip path to absolute
  const clipPathData = clipPathPercent ? clipPathPercent.map(cmd => {
    switch(cmd.type) {
      case 'M':
        return `M ${cmd.x * size} ${cmd.y * size}`;
      case 'C':
        return `C ${cmd.x1 * size} ${cmd.y1 * size}, ${cmd.x2 * size} ${cmd.y2 * size}, ${cmd.x * size} ${cmd.y * size}`;
      case 'S':
        return `S ${cmd.x2 * size} ${cmd.y2 * size}, ${cmd.x * size} ${cmd.y * size}`;
      case 'Q':
        return `Q ${cmd.x1 * size} ${cmd.y1 * size}, ${cmd.x * size} ${cmd.y * size}`;
      case 'T':
        return `T ${cmd.x * size} ${cmd.y * size}`;
      case 'L':
        return `L ${cmd.x * size} ${cmd.y * size}`;
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
       marginLeft: `-${size / 2}px`,
       marginTop: `-${size / 2}px`,
       zIndex: z
       }}
      >
      <svg
        width={size}
        height={size}
        className="overflow-visible"
      >
        {/* Define clip path if provided */}
        {clipPathData && (
          <defs>
            <clipPath id="margenClip">
              <path d={clipPathData} />
            </clipPath>
          </defs>
        )}

        {/* Main circle with stroke */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="none"
          stroke="var(--color-light-blue)"
          strokeWidth={strokeWidth}
          clipPath={clipPathData ? "url(#margenClip)" : undefined}
        />

        {/* Circles with texts positioned at specific angles */}
        {circles.map((circle, index) => {
          const angleRad = (circle.angle - 90) * (Math.PI / 180); // -90 so that 0° is at the top
          const x = centerX + innerRadius * Math.cos(angleRad);
          const y = centerY + innerRadius * Math.sin(angleRad);

          return (
            <g key={index}>
              {/* Small circle */}
              <circle
                cx={x}
                cy={y}
                r={circleRadius}
                fill="var(--color-teal-dark)"
                fillOpacity="0.43"
              />

              {/* Text line 1 */}
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className={FontStyle}
                fill="currentColor"
              >
                {circle.text1}
              </text>

              {/* Text line 2 */}
              <text
                x={x}
                y={y + 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className={FontStyle}
                fill="currentColor"
              >
                {circle.text2}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Boton({ text = "Lorem", width = 130, height = 50, className = "", href = "#", z = 0}) {
  return (
    <a
      href={href}
      style={{
        marginLeft: `-${width / 2}px`,
        marginTop: `-${height / 2}px`,
        zIndex: z
      }}
      className={`inline-block ${className}`}
    >
      <svg
        width={width}
        height={height}
        className="overflow-visible"
      >
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx={height / 2}
          ry={height / 2}
          fill="var(--color-teal-dark)"
          fillOpacity="0.43"
        />
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-circular font-bold text-3xl"
          fill="currentColor"
        >
          {text}
        </text>
      </svg>
    </a>
  );
}

function Titulo({ line1 = "Line 1", line2 = "Line 2", line3 = "Line 3", className = "", z = 0 }) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        zIndex: z
      }}
    >
      <div className="font-circular text-center font-bold leading-tight" style={{ fontSize: '75px' }}>
        <div style={{ color: 'var(--color-blue-dark)' }}>{line1}</div>
        <div style={{ color: 'var(--color-blue-dark)' }}>{line2}</div>
        <div style={{ color: 'var(--color-light-blue)' }}>{line3}</div>
      </div>
    </div>
  );
}

function LineaIrregular({
  width = 1200,
  height = 1200,
  strokeWidth = 3,
  strokeColor = "var(--color-light-blue)",
  className = "",
  z = 0,
  scale = 1,
  pathData = "M677 3.00002C671.5 4.00002 409.5 -7.99998 338 86C266.5 180 24 321.5 186.5 319C349 316.5 234 121.5 329.5 189C425 256.5 616 251 593 356.5C570 462 513.5 676.5 359 574.5C204.5 472.5 246 341.5 154.5 469.5C63 597.5 -117 721.5 121 806C359 890.5 382.5 921.5 472 843.5C561.5 765.5 835 631.5 794.5 724C754 816.5 711 936 582 979.5C453 1023 15.5 977 44.5 1172.5"
}) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        marginLeft: `-${width / 2}px`,
        marginTop: `-${height / 2}px`,
        zIndex: z,
        transform: `scale(${scale})`,
        transformOrigin: 'center'
      }}
    >
      <svg
        width={width}
        height={height}
        className="overflow-visible"
      >
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function UbicacionCard({
  text = "Location",
  cardWidth = 400,
  cardHeight = 250,
  pinSize = 120,
  className = "",
  z = 0,
  rotation = 0
}) {
  const pinWhiteScale = 1.2;
  const pinOffset = pinSize * 1;

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        marginLeft: `-${cardWidth / 2}px`,
        marginTop: `-${cardHeight / 2}px`,
        zIndex: z,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: `${cardWidth / 2}px ${pinOffset + cardHeight / 2}px`
      }}
    >
      <svg
        width={cardWidth}
        height={cardHeight + pinOffset}
        className="overflow-visible"
      >
        <defs>
          {/* Filter for white version */}
          <filter id="whitePin">
            <feFlood floodColor="white" result="white" />
            <feComposite in="white" in2="SourceAlpha" operator="in" />
          </filter>

          {/* Filter for light blue version */}
          <filter id="lightBluePin">
            <feFlood floodColor="var(--color-light-blue)" result="lightBlue" />
            <feComposite in="lightBlue" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>

        {/* Rounded rectangle (card) */}
        <rect
          x="0"
          y={pinOffset}
          width={cardWidth}
          height={cardHeight}
          rx={30}
          ry={30}
          fill="var(--color-light-blue)"
        />

        {/* Location pin - large white version */}
        <image
          href="/assets/Ubication.svg"
          x={cardWidth / 2 - (pinSize * pinWhiteScale) / 2}
          y={53}
          width={pinSize * pinWhiteScale}
          height={pinSize * pinWhiteScale}
          filter="url(#whitePin)"
        />

        {/* Location pin - normal light-blue version */}
        <image
          href="/assets/Ubication.svg"
          x={cardWidth / 2 - pinSize / 2}
          y={(pinSize * pinWhiteScale - pinSize) / 2+50}
          width={pinSize}
          height={pinSize}
          filter="url(#lightBluePin)"
        />

        {/* Text inside card */}
        <text
          x={cardWidth / 2}
          y={pinOffset + cardHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-circular font-bold text-3xl"
          fill="white"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}

function SeccionConPin({
  pinSize = 120,
  height = '200vh',
  title = "Título Principal",
  text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  footerText = "© 2025 - Todos los derechos reservados",
  className = "",
  z = 0
}) {
  const pinWhiteScale = 1.2;
  const pinOffset = pinSize * 1;

  return (
    <div
      className={`w-screen bg-[var(--color-light-blue)] ${className}`}
      style={{
        height: height,
        zIndex: z,
      }}
    >
      <svg
        width={pinSize * pinWhiteScale}
        height={pinSize * pinWhiteScale}
        className="overflow-visible"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: `translateX(-50%) translateY(-${pinOffset}px)`
        }}
      >
        <defs>
          {/* Filter for light blue version */}
          <filter id="whitePinLarge">
            <feFlood floodColor="var(--color-light-blue)" result="lightBlue" />
            <feComposite in="lightBlue" in2="SourceAlpha" operator="in" />
          </filter>

          {/* Filter for white version */}
          <filter id="whitePinSmall">
            <feFlood floodColor="white" result="white" />
            <feComposite in="white" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>

        {/* Location pin - large light-blue version */}
        <image
          href="/assets/Ubication.svg"
          x={0}
          y={53}
          width={pinSize * pinWhiteScale}
          height={pinSize * pinWhiteScale}
          filter="url(#whitePinLarge)"
        />

        {/* Location pin - normal white version */}
        <image
          href="/assets/Ubication.svg"
          x={(pinSize * pinWhiteScale - pinSize) / 2}
          y={(pinSize * pinWhiteScale - pinSize) / 2 + 50}
          width={pinSize}
          height={pinSize}
          filter="url(#whitePinSmall)"
        />
      </svg>
    /</div>
  );
}

function TextoConTitulo({
  title = "Title",
  description = "Description text goes here",
  maxWidth = 400,
  fontSize = "1.25rem",
  className = "",
  z = 0
}) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        maxWidth: `${maxWidth}px`,
        zIndex: z,
        textAlign: 'left'
      }}
    >
      <h2
        className="font-circular font-bold mb-4"
        style={{
          color: 'var(--color-blue-dark)',
          fontSize: fontSize,
          letterSpacing: '-0.04em',
          lineHeight: '1.1'
        }}
      >
        {title}
      </h2>
      <p
        className="font-circular"
        style={{
          color: 'black',
          fontSize: fontSize,
          letterSpacing: '-0.04em',
          lineHeight: '1.1'
        }}
      >
        {description}
      </p>
    </div>
  );
}

function ImagenConBorde({
  src = "/assets/Kayak.jpg",
  width = 300,
  height = 400,
  borderRadius = 40,
  borderWidth = 4,
  borderColor = "var(--color-light-blue)",
  className = "",
  z = 0,
  rotation = 0
}) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        marginLeft: `-${width / 2}px`,
        marginTop: `-${height / 2}px`,
        zIndex: z,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center'
      }}
    >
      <svg
        width={width}
        height={height}
        className="overflow-visible"
      >
        <defs>
          {/* Define clip path for rounded rectangle */}
          <clipPath id={`imageClip-${src.replace(/[^a-zA-Z0-9]/g, '')}`}>
            <rect
              x={borderWidth / 2}
              y={borderWidth / 2}
              width={width - borderWidth}
              height={height - borderWidth}
              rx={borderRadius}
              ry={borderRadius}
            />
          </clipPath>
        </defs>

        {/* Image with mask/clip path */}
        <image
          href={src}
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={width - borderWidth}
          height={height - borderWidth}
          clipPath={`url(#imageClip-${src.replace(/[^a-zA-Z0-9]/g, '')})`}
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Border */}
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={width - borderWidth}
          height={height - borderWidth}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
      </svg>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ overflowX: 'hidden', width: '100vw', height: 'calc(1500px + 200vh)', overflowY: 'auto' }}>
      <h1 className="text-white text-left absolute top-25 left-7/20 leading-[0.8]">
        <span className="font-vegan">R </span><span className="font-roboto italic">io</span><br></br>
        <span className="font-vegan pl-30">A </span><span className="font-roboto italic">tuel</span>
      </h1>
      <Boton className="fixed top-20 left-2/6" text="Lorem" />
      <Boton className="fixed top-20 left-3/6" text="Lorem" />
      <Boton className="fixed top-20 left-4/6" text="Lorem" />
      <Boton className="fixed top-15 left-15" text="O" width={60} height={60}/>
      <Boton className="fixed top-15 left-35" text="O" width={60} height={60}/>
      <Boton className="fixed top-15 left-55" text="O" width={60} height={60}/>
      <HBoton className="fixed top-20 left-5/6" text="Lorem" />
      <Margen
        className="absolute top-200 left-5/20"
        z={0}
        circles={[
          { angle: 330, text1: "North", text2: "Top" },
          { angle: 55, text1: "SouthEast", text2: "Bottom" },
          { angle: 90, text1: "SouthWest", text2: "Left" }
        ]}
        clipPathPercent={[
          { type: 'M', x: 0, y: 0 },
          { type: 'L', x: 1, y: 0 },
          { type: 'L', x: 1, y: 0.5 },
          { type: 'C', x1: 0.7, y1: 0.55, x2: 0.3, y2: 0.75, x: 0, y: 0.55 },
          { type: 'Z' }
        ]}
      />
      <Rio className="absolute top-175 left-5/20" z={1} />
      <Titulo
        className="absolute top-340 left-5/20"
        z={2}
        line1="Lorem ipsum dolor sit amet"
        line2="consectetur adipiscing elit."
        line3="Nunc vitae porttitor erat"
      />
      <ImagenConBorde
        className="absolute top-510 left-2/20"
        z={2}
        src="/assets/represa.jpg"
        width={300}
        height={500}
        rotation={-10}
      />
      <ImagenConBorde
        className="absolute top-510 left-5/20"
        z={2}
        src="/assets/map.jpg"
        width={300}
        height={500}
        rotation={-5}
      />
      <ImagenConBorde
        className="absolute top-500 left-7/20"
        z={2}
        src="/assets/Kayak.jpg"
        width={300}
        height={500}
        rotation={15}
      />
      <TextoConTitulo
        className="absolute top-450 left-13/20"
        z={2}
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae porttitor erat. "
        description="Duis orci diam, mollis ut eros in, eleifend volutpat lectus. Aenean tristique lacinia congue. Nullam diam leo, dignissim fermentum."
        maxWidth={450}
        fontSize="2.5rem"
      />
      <LineaIrregular
        className="absolute top-1350 left-15/20"
        z={1}
        width={1000}
        height={1200}
        strokeWidth={5}
        strokeColor="white"
        scale={5}
      />
      <UbicacionCard
        className="absolute top-600 left-15/20"
        z={2}
        text="Mendoza"
        cardWidth={400}
        cardHeight={250}
        rotation={5}
      />
      <UbicacionCard
        className="absolute top-800 left-5/20"
        z={2}
        text="Mendoza"
        cardWidth={400}
        cardHeight={250}
        rotation={-15}
      />
      <UbicacionCard
        className="absolute top-1000 left-15/20"
        z={2}
        text="Mendoza"
        cardWidth={400}
        cardHeight={250}
        rotation={10}
      />
      <UbicacionCard
        className="absolute top-1200 left-5/20"
        z={2}
        text="Mendoza"
        cardWidth={400}
        cardHeight={250}
        rotation={-5}
      />
      <SeccionConPin
        className="absolute top-1500 left-0"
        z={1}
        height="200vh"
        title="Río Atuel"
        text="El Río Atuel es uno de los principales cursos de agua de la provincia de Mendoza, Argentina. Nace en la Cordillera de los Andes y recorre un extenso territorio hasta formar el emblemático Valle de Atuel, conocido por sus paisajes únicos y su importancia histórica y cultural."
        footerText="© 2025 Río Atuel - Todos los derechos reservados"
      />
    </div>
  )
}

export default App
