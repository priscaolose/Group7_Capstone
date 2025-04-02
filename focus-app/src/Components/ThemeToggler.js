import React from "react";
import { useColorScheme } from "@mui/material/styles";
import { Button, Box } from "@mui/material";

function ThemeToggler() {
  const { mode, setMode } = useColorScheme();

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      <Button variant="contained" onClick={() => setMode("light")}>Light</Button>
      <Button variant="contained" onClick={() => setMode("dark")}>Dark</Button>
      <Button variant="contained" onClick={() => setMode("system")}>System</Button>
    </Box>
  );
}

export default ThemeToggler;
