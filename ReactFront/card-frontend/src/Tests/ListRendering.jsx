import { Card, Box, Typography } from "@mui/material";
import BoltIcon from '@mui/icons-material/Bolt';

export default function LightningTest({ word = "Hello", meaning = "Привет", difficulty = 5 }) {
  const lightningColors = ["#4CAF50", "#FFEB3B", "#FF9800", "#F44336", "#9C27B0"];

  const lightningIcons = Array.from({ length: difficulty }, (_, i) => (
    <BoltIcon
      key={i}
      sx={{
        color: lightningColors[difficulty - 1],
        fontSize: "2rem",
        mx: 0.25
      }}
    />
  ));

  return (
    <Card sx={{ width: 300, minHeight: 200, borderRadius: 3, p: 2, textAlign: "center", bgcolor: "#323261", color: "#f8f8f2" }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>{lightningIcons}</Box>
      <Typography variant="h5" sx={{ mb: 1 }}>{word}</Typography>
      <Typography variant="body1">{meaning}</Typography>
    </Card>
  );
}

