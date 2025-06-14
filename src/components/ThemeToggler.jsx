import { useThemeContext } from "../context/ThemeContext";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <div className="relative">
      <button
        className={`cursor-pointer border border-gray-400 dark:border-gray-600 rounded-full p-1.5 shadow-2xl fixed right-5 bottom-5 transition z-100 ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
        onClick={() => toggleTheme()}
      >
        {theme === "light" ? "🌙" : "🌞"}
      </button>
    </div>
  );
};

export default ThemeToggler;
