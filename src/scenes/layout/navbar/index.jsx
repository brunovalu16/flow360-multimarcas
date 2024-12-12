import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  MenuOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { ToggledContext } from "../../../App";
import { auth, db } from "../../../data/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const theme = useTheme();
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Para redirecionar após logout
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Buscar username no Firestore
        try {
          const docRef = doc(db, "user", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUsername(docSnap.data().username);
          } else {
            
          }
        } catch (error) {
          
        }
      } else {
        setUser(null);
        setUsername("");
      }
    });

    return () => unsubscribe();
  }, []);


  return (
  <>
        <Toolbar
          sx={{ backgroundColor: "#f2f0f0", boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
            
              <KeyboardDoubleArrowRightIcon 
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ color: "#312783", marginRight: "10px" }}
              />
              
            
            <Typography
                variant="h8"
                component="div"
                sx={{ color: "#7f7f7f", fontSize: "10px" }}>
                Copyright © 2024 | Grupo Fokus  
            </Typography>

            <Typography
                variant="h8"
                component="div"
                sx={{ color: "#7f7f7f", display: "flex", alignItems: "flex-end", marginBottom: "10px", transform: "scale(0.7)"}}>
                  Desenvolvido por:
                  <img  
                    src="src/assets/images/colibri.png" 
                    alt="Logo Colibri" 
                    style={{ width: "100px", height: "auto", marginLeft: "5px", marginLeft: "15px", marginRight: "20px"  }} 
                  />
                   Colibri | Sistemas inteligentes
            </Typography>
         </Toolbar>

  <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={5}
        sx={{
          backgroundColor: "#e8e5e5",
         }}>
          
         
      
      {/* Conteúdo do Box */}

      

      
      {/* Input */}
      <Box display="flex" alignItems="center" gap={2}>
          {/* Campo de Pesquisa */}
          <Box
            display="flex"
            alignItems="center"
            bgcolor="#ffffff" // Fundo branco para o box
            padding="4px"
            sx={{
              display: `${isXsDevices ? "none" : "flex"}`,
            }}
          >
            <InputBase placeholder="Pesquisar..." sx={{ ml: 2, flex: 1 }} />
          </Box>

          

          {/* Botão de Pesquisa */}
          <IconButton
            type="button"
            sx={{
              p: 0.7,
              bgcolor: "#312783", // Fundo azul
              color: "#00ebf7", // Ícone branco
              borderRadius: "1%", // Faz o botão ser circular
              marginLeft: "-7%", // Faz o botão ser
              padding: "8px",
              "&:hover": {
                bgcolor: "#4a43cc", // Efeito hover (opcional)
              },
            }}
          >
            <SearchOutlined />
          </IconButton>
      </Box>

      
      {/* Parte direita */}
      <Box display="flex" alignItems="center" gap={2}>

          {/* Adicionando logo ou imagem */}
          <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="src/assets/images/fokus360cinza.png"
                alt="Logo"
                style={{
                  maxWidth: "150px",
                  height: "auto",
                }}
              />
          </Box>

          {/* Linha vertical */}
          <Box
            sx={{
              width: "1px",
              height: "35px", // Ajuste conforme necessário
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              marginLeft: "20px",
              marginRight: "10px",
            }}
          />

          <IconButton>
            <NotificationsOutlined />
          </IconButton>
          
          <IconButton>
            <SettingsOutlined />
          </IconButton>

          <Box
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#5f53e5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PersonOutlined sx={{ fontSize: "24px", color: "#fff" }} />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color={theme.palette.text.secondary}
            >
              {user ? `Olá, ${username}` : ""}
            </Typography>
          </Box>

      </Box>
  </Box>
        <Toolbar 
              sx={{
                "&.MuiToolbar-root": { // &.MUI É A BIBLIOTECA
                  height: "40px", // Define a altura fixa
                  minHeight: "40px", // Define a altura mínima
                  padding: "0", // Remove o padding
                  },
                  alignSelf: "center",
                  backgroundColor: "#312783",
                  width: "100%"
              }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu">
              <ArrowCircleRightIcon
                sx={{ color: "#00ebf7", marginLeft: "15px", fontSize: "17px", marginLeft: "38px" }}/>
            </IconButton>
            <Typography
                variant="h8"
                component="div"
                marginTop="3px"
                sx={{ flexGrow: 1, color: "#c2c2c2", fontSize: "12px", marginBottom: "3px" }}>
              GRUPO FOKUS  |  www.grupofokus.com.br
            </Typography>
        </Toolbar>
  </>
  );
};

export default Navbar;


//{user ? `Olá, ${username || user.email}` : "Usuário não logado"}
//boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
//background: "linear-gradient(to right, #d8d8d8, #ffffff)",
