import { motion } from "motion/react";
const Carousel = () => {
  const brandsArray = [
    "aditya_birla_group.webp",
    "amazon.webp",
    "asian_paints2.webp",
    "flipkart.webp",
    "walmart.webp",
    "loreal.webp",
    "wipro2.webp",
    "aditya_birla_group.webp",
    "amazon.webp",
    "asian_paints2.webp",
    "flipkart.webp",
    "walmart.webp",
    "loreal.webp",
    "wipro2.webp",
  ];

  return (
    <div className="py-10">
      <h1 className="text-center py-8 text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 max-w-sm mx-auto bg-clip-text text-transparent">
        Our Trsuted Partners
      </h1>
      <div className="flex max-w-7xl mx-auto overflow-hidden relative">
        {/* left Fade */}
        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white dark:from-slate-950 to-transparent  z-20" />
        {/* Right Fade */}
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-20" />
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {brandsArray.map((brand, index) => (
            <img
              className={`h-30 w-40 md:h-40 md:w-60 ${brand === "amazon.webp" || brand === "loreal.webp" ? "dark:invert-100" : ""}`}
              src={`/images/brands/${brand}`}
              alt={brand + "_" + index}
              key={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
