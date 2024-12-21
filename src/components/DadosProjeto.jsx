import React from "react";
import { Box, useMediaQuery, useTheme, Typography, CircularProgress  } from "@mui/material";
import  StatBox  from "../../src/components/StatBox";
import { Email, PersonAdd, PointOfSale } from "@mui/icons-material";
import { tokens } from "../theme";
import Lista from "../components/Lista";
import PaidIcon from '@mui/icons-material/Paid';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function DadosProjeto() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          marginLeft: "40px",
          paddingTop: "50px",
        }}
      ></Box>

      <Box
        sx={{
          marginLeft: "40px",
          marginTop: "-15px",
          width: "calc(100% - 80px)",
          minHeight: "50vh",
          padding: "15px",
          paddingLeft: "30px",
          borderRadius: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          bgcolor: "#f2f0f0",
          overflowX: "hidden",
        }}
      >
        


        {/* GRID & CHARTS */}
        <Box
          paddingBottom="20px"
          borderRadius="20px"
          paddingTop="20px"
          display="grid"
          gridTemplateColumns={
            isXlDevices
              ? "repeat(12, 1fr)"
              : isMdDevices
              ? "repeat(6, 1fr)"
              : "repeat(6, 1fr)"
          }
          gridAutoRows="140px"
          gap="20px"
        >
          {/* Statistic Items */}
          {[
            {
              title: "11,361",
              subtitle: "Orçamento",
              progress: 75,
              increase: "+14%",
              icon: <PaidIcon sx={{ color: "#fff", fontSize: "40px" }} />,
              progressColor: "#4caf50", // Cor do gráfico
            },
            {
              title: "431,225",
              subtitle: "Custo realizado",
              progress: 50,
              increase: "+21%",
              icon: <PaidIcon sx={{ color: "#fff", fontSize: "40px" }} />,
              progressColor: "#ff9800", // Cor do gráfico
            },
            {
              title: "32,441",
              subtitle: "Total de tarefas",
              progress: 30,
              increase: "+5%",
              icon: (
                <AssignmentTurnedInIcon
                  sx={{ color: "#fff", fontSize: "40px" }}
                />
              ),
              progressColor: "#2196f3", // Cor do gráfico
            },
          ].map((item, index) => (
            <Box
              key={index}
              boxShadow={3}
              borderRadius="20px"
              gridColumn="span 4"
              bgcolor="#312783"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="20px"
              sx={{
                gap: "10px",
                position: "relative",
              }}
            >
              {/* Ícone à Esquerda */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                {item.icon}
              </Box>

              {/* Linha Vertical */}
              <Box
                sx={{
                  width: "2px",
                  height: "80%",
                  backgroundColor: "#ffffff4d",
                  margin: "0 2px",
                }}
              />

              {/* Texto no Meio */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  textAlign: "center",
                  flex: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#fff" }}
                >
                  {item.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "#b0b0b0" }}>
                  {item.subtitle}
                </Typography>
                <Typography variant="body2" sx={{ color: "#8bc34a" }}>
                  {item.increase}
                </Typography>
              </Box>

              {/* Gráfico à Direita */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={item.progress}
                  size={60}
                  thickness={6} // Define a espessura do círculo
                  sx={{
                    color: item.progressColor,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        {/** COMPONENTE */}
        <Lista />
      </Box>
    </>
  );
}

export default DadosProjeto;
