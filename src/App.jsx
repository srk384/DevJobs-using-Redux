import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useThemeContext } from "./context/ThemeContext";
import ThemeToggler from "./components/ThemeToggler";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import AppliedJobs from "./pages/AppliedJobs";
import JobSuccess from "./components/JobSuccess";

function App() {
  const { theme } = useThemeContext();

  return (
    <div className="font-[Nunito]">
      <div className="fixed left-0 top-0 -z-10 h-full w-full ">
        {theme === "light" && (
          <div className="relative h-full w-full bg-white ">
            <div className=" absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          </div>
        )}
        {theme === "dark" && (
          <div className="relative h-full w-full bg-slate-950 ">
            <div className=" absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          </div>
        )}
      </div>
      <ThemeToggler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/confirmation/:id" element={<JobSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
