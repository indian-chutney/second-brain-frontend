import { Brain } from "iconoir-react";
import { motion } from "framer-motion";

const brandcolor = "#8b5cf6";
const secondcolor = "#374151";

export const Loader = () => {
  return (
    <div style={{ position: "relative", width: 64, height: 64 }}>
      {/* Grey brain (background) */}
      <Brain color={secondcolor} width={64} height={64} strokeWidth={"2.2"} />

      {/* Purple brain (fills up from bottom) */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
        initial={{ height: 2 }}
        animate={{ height: 64 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Brain color={brandcolor} width={64} height={64} strokeWidth={"2.2"} />
      </motion.div>
    </div>
  );
};
