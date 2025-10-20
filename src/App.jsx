import { useState, useEffect } from 'react'
import './App.css'
import content from './content.json'

function HBoton({ text = "Lorem", className = "", href = "#", z = 0}) {
  const radius = 30;
  const rectWidth = 150;
  const rectHeight = 60;
  const totalWidth = radius * 2 + rectWidth;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        marginLeft: `-${totalWidth / 2}px`,
        marginTop: `-${radius}px`,
        zIndex: z
      }}
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width={totalWidth}
        height={radius * 2}
        className="overflow-visible"
      >
        {/* Circle on the left - shrinks to disappear */}
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="var(--color-teal-dark)"
          fillOpacity="0.43"
          style={{
            transform: isHovered ? 'scale(0)' : 'scale(1)',
            transformOrigin: `${radius}px ${radius}px`,
            transition: 'transform 0.3s ease-in-out'
          }}
        />

        {/* Arrow icon in the left circle */}
        <image
          href="/assets/up-right-arrow.svg"
          x={radius - 12}
          y={radius - 12}
          width={24}
          height={24}
          style={{
            transform: isHovered ? 'scale(0)' : 'scale(1)',
            transformOrigin: `${radius}px ${radius}px`,
            transition: 'transform 0.3s ease-in-out'
          }}
        />

        {/* Circle reappearing on the right - grows from zero */}
        <circle
          cx={totalWidth - radius}
          cy={radius}
          r={radius}
          fill="var(--color-teal-dark)"
          fillOpacity="0.43"
          style={{
            transform: isHovered ? 'scale(1)' : 'scale(0)',
            transformOrigin: `${totalWidth - radius}px ${radius}px`,
            transition: 'transform 0.3s ease-in-out 0.3s'
          }}
        />

        {/* Arrow icon in the right circle */}
        <image
          href="/assets/up-right-arrow.svg"
          x={totalWidth - radius - 12}
          y={radius - 12}
          width={24}
          height={24}
          style={{
            transform: isHovered ? 'scale(1)' : 'scale(0)',
            transformOrigin: `${totalWidth - radius}px ${radius}px`,
            transition: 'transform 0.3s ease-in-out 0.3s'
          }}
        />

        {/* Rectangle with border radius */}
        <g
          style={{
            transform: isHovered ? `translateX(-${radius * 2}px) rotate(-3deg)` : 'translateX(0) rotate(0deg)',
            transformOrigin: `${radius * 2 + rectWidth / 2}px ${radius}px`,
            transition: 'transform 0.4s ease-in-out'
          }}
        >
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
        </g>
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
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY * 0.05; // Adjust multiplier for speed
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <textPath href="#riverPath" startOffset={`${scrollOffset}%`} method="align" spacing="auto">
            Desde Mendoza - Hasta panama - Desde Mendoza - Hasta panama - Desde Mendoza - Hasta panama - Desde Mendoza - Hasta panama - Desde Mendoza - Hasta panama - Desde Mendoza - Hasta panama - Desde Mendoza - Hasta panama - Desde Mendoza - Hasta panama -
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

function Titulo({ line1 = "", line2 = "", line3 = "", className = "", z = 0, id = "" }) {
  return (
    <div
      id={id}
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
          {text.split('\n').map((line, index, array) => (
            <tspan
              key={index}
              x={cardWidth / 2}
              dy={index === 0 ? -(array.length - 1) * 20 : 40}
            >
              {line}
            </tspan>
          ))}
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
  textAlign = "left",
  z = 0
}) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        maxWidth: `${maxWidth}px`,
        zIndex: z,
        textAlign: textAlign
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
      {/* Header Title */}
      <h1 className="text-white text-left absolute top-25 left-7/20 leading-[0.8]">
        <span className="font-vegan">{content.header.title.line1}</span>
        <span className="font-roboto italic">{content.header.title.line2}</span><br></br>
        <span className="font-vegan pl-30">{content.header.title.line3}</span>
        <span className="font-roboto italic">{content.header.title.line4}</span>
      </h1>

      {/* Main Navigation Buttons */}
      {content.navigation.mainButtons.map((btn, index) => (
        <Boton
          key={`main-btn-${index}`}
          className={`fixed top-20 ${btn.position}`}
          text={btn.text}
          href={btn.href}
          z={9999}
        />
      ))}

      {/* Small Navigation Buttons */}
      {content.navigation.smallButtons.map((btn, index) => (
        <Boton
          key={`small-btn-${index}`}
          className={`fixed top-15 ${btn.position}`}
          text={btn.text}
          href={btn.href}
          width={60}
          height={60}
          z={9999}
        />
      ))}

      {/* Horizontal Button */}
      <HBoton
        className={`fixed top-20 ${content.navigation.horizontalButton.position}`}
        text={content.navigation.horizontalButton.text}
        href={content.navigation.horizontalButton.href}
        z={9999}
      />

      {/* Margen Component */}
      <Margen
        className="absolute top-200 left-5/20"
        z={0}
        circles={content.margen.circles}
        clipPathPercent={[
          { type: 'M', x: 0, y: 0 },
          { type: 'L', x: 1, y: 0 },
          { type: 'L', x: 1, y: 0.5 },
          { type: 'C', x1: 0.7, y1: 0.55, x2: 0.3, y2: 0.75, x: 0, y: 0.55 },
          { type: 'Z' }
        ]}
      />

      {/* Rio Component */}
      <Rio className="absolute top-175 left-5/20" z={1} />

      {/* Main Title */}
      <Titulo
        id="main-title"
        className="absolute top-340 left-5/20"
        z={2}
        line1={content.mainTitle.line1}
        line2={content.mainTitle.line2}
        line3={content.mainTitle.line3}
      />

      {/* Images */}
      <ImagenConBorde
        className="absolute top-510 left-2/20"
        z={2}
        src={content.images[0].src}
        width={content.images[0].width}
        height={content.images[0].height}
        rotation={content.images[0].rotation}
      />
      <ImagenConBorde
        className="absolute top-510 left-5/20"
        z={2}
        src={content.images[1].src}
        width={content.images[1].width}
        height={content.images[1].height}
        rotation={content.images[1].rotation}
      />
      <ImagenConBorde
        className="absolute top-500 left-7/20"
        z={2}
        src={content.images[2].src}
        width={content.images[2].width}
        height={content.images[2].height}
        rotation={content.images[2].rotation}
      />

      {/* Main Text Block */}
      <TextoConTitulo
        className="absolute top-450 left-13/20"
        z={2}
        title={content.mainTextBlock.title}
        description={content.mainTextBlock.description}
        maxWidth={content.mainTextBlock.maxWidth}
        fontSize={content.mainTextBlock.fontSize}
      />

      {/* Linea Irregular */}
      <LineaIrregular
        className="absolute top-1350 left-15/20"
        z={1}
        width={1000}
        height={1200}
        strokeWidth={5}
        strokeColor="white"
        scale={5}
      />

      {/* Ubicacion Cards */}
      <UbicacionCard
        className="absolute top-600 left-15/20"
        z={2}
        text={content.ubicacionCards[0].text}
        cardWidth={content.ubicacionCards[0].cardWidth}
        cardHeight={content.ubicacionCards[0].cardHeight}
        rotation={content.ubicacionCards[0].rotation}
      />
      <HBoton
        className="absolute top-670 left-15/20"
        text={content.ubicacionCards[0].buttonText}
        href={content.ubicacionCards[0].buttonHref}
        z={3}
      />

      <UbicacionCard
        className="absolute top-800 left-5/20"
        z={2}
        text={content.ubicacionCards[1].text}
        cardWidth={content.ubicacionCards[1].cardWidth}
        cardHeight={content.ubicacionCards[1].cardHeight}
        rotation={content.ubicacionCards[1].rotation}
      />
      <HBoton
        className="absolute top-870 left-5/20"
        text={content.ubicacionCards[1].buttonText}
        href={content.ubicacionCards[1].buttonHref}
        z={3}
      />

      <UbicacionCard
        className="absolute top-1000 left-15/20"
        z={2}
        text={content.ubicacionCards[2].text}
        cardWidth={content.ubicacionCards[2].cardWidth}
        cardHeight={content.ubicacionCards[2].cardHeight}
        rotation={content.ubicacionCards[2].rotation}
      />
      <HBoton
        className="absolute top-1070 left-15/20"
        text={content.ubicacionCards[2].buttonText}
        href={content.ubicacionCards[2].buttonHref}
        z={3}
      />

      <UbicacionCard
        className="absolute top-1200 left-5/20"
        z={2}
        text={content.ubicacionCards[3].text}
        cardWidth={content.ubicacionCards[3].cardWidth}
        cardHeight={content.ubicacionCards[3].cardHeight}
        rotation={content.ubicacionCards[3].rotation}
      />
      <HBoton
        className="absolute top-1270 left-5/20"
        text={content.ubicacionCards[3].buttonText}
        href={content.ubicacionCards[3].buttonHref}
        z={3}
      />

      {/* Seccion Con Pin */}
      <SeccionConPin
        className="absolute top-1500 left-0"
        z={1}
        height="200vh"
      />

      {/* Seccion Con Pin Title */}
      <Titulo
        className="absolute top-1550 left-5/20"
        z={2}
        line1={content.seccionConPin.title.line1}
        line2={content.seccionConPin.title.line2}
      />

      {/* Seccion Con Pin Text Blocks */}
      <TextoConTitulo
        className="absolute top-1650 left-5/20"
        z={2}
        title={content.seccionConPin.textBlocks[0].title}
        description={content.seccionConPin.textBlocks[0].description}
        maxWidth={content.seccionConPin.textBlocks[0].maxWidth}
        fontSize={content.seccionConPin.textBlocks[0].fontSize}
        textAlign={content.seccionConPin.textBlocks[0].textAlign}
      />
      <TextoConTitulo
        className="absolute top-1650 left-10/20"
        z={2}
        title={content.seccionConPin.textBlocks[1].title}
        description={content.seccionConPin.textBlocks[1].description}
        maxWidth={content.seccionConPin.textBlocks[1].maxWidth}
        fontSize={content.seccionConPin.textBlocks[1].fontSize}
        textAlign={content.seccionConPin.textBlocks[1].textAlign}
      />

      {/* Footer */}
      <h1 className="text-white text-left absolute top-1800 left-6/20 leading-[0.8] z-10">
        <span className="font-vegan">{content.footer.text}</span>
        <span className="font-roboto italic">{content.footer.text2}</span><br></br>
      </h1>
    </div>
  )
}

export default App
