import { Box } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";

const lightningColors = [
  "#4CAF50",
  "#FFEB3B",
  "#FF9800",
  "#F44336",
  "#9C27B0",
];

export default function DifficultyIndicator({ level }) {
  if (!level) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: level }).map((_, i) => (
        <BoltIcon
          key={i}
          sx={{
            color: lightningColors[level - 1],
            fontSize: "5rem",
            mx: 0.25,
          }}
        />
      ))}
    </Box>
  );
}
