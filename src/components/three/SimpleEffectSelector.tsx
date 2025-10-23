"use client";

interface SimpleEffectSelectorProps {
  currentType: string;
  onTypeChange: (type: string) => void;
}

export const SimpleEffectSelector: React.FC<SimpleEffectSelectorProps> = ({
  currentType,
  onTypeChange,
}) => {
  const effects: { type: string; name: string; emoji: string }[] = [
    { type: "particles", name: "Partículas", emoji: "✨" },
    { type: "geometries", name: "Geometrías", emoji: "🔷" },
    { type: "waves", name: "Ondas", emoji: "🌊" },
  ];

  return (
    <div className="fixed top-20 right-4 z-50 bg-white/90 dark:bg-black/80 rounded-xl p-4">
      <h3 className="text-gray-800 dark:text-white text-sm font-semibold mb-3">
        Efectos 3D
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {effects.map(({ type, name, emoji }) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
              ${
                currentType === type
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"
              }
            `}
          >
            <span>{emoji}</span>
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
