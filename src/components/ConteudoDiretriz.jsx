import React, { useState } from "react";
import {
  Checkbox,
  ListItemText,
  Box,
  Button,
  Select,
  Typography,
  MenuItem,
  TextField,
  Accordion,
  AccordionDetails,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { Header } from "../../components";
import { mockDiretrizes } from "../../data/mockData";

const ConteudoDiretriz = () => {
  const [diretrizes] = useState(mockDiretrizes || []);
  const [formValues, setFormValues] = useState({
      nome: "",
      dataInicio: "",
      prazoPrevisto: "",
      cliente: "",
      categoria: [], // Inicializado como array vazio
      valor: "",
      descricao: "",
    });

    const handleInputChangeReal = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };

  // Combina os handlers de input e select
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, categoria: e.target.value });
  };

  return (
    <>
      {/* Header */}
      <Box sx={{ marginLeft: "40px", paddingTop: "50px" }}>
        <Header
          title={
            <Box display="flex" alignItems="center" gap={1}>
              <DescriptionIcon sx={{ color: "#5f53e5", fontSize: 40 }} />
              <Typography>CADASTRO DE PROJETOS</Typography>
            </Box>
          }
        />
      </Box>

      {/* Acordeon sempre visível */}
      <Accordion
        disableGutters
        expanded={true}
        sx={{
          marginLeft: "40px",
          width: "calc(100% - 90px)",
          marginTop: "20px",
          borderRadius: "15px",
          backgroundColor: "#f2f0f0",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <AccordionDetails>
          {/* Lista de Diretrizes */}
          {diretrizes.length > 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                marginTop: "15px",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#5f53e5",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Button
                onClick={() =>
                  console.log(`Diretriz clicada: ${diretrizes[0].title}`)
                }
                disableRipple
                sx={{
                  textAlign: "left",
                  flex: 1,
                  textTransform: "none",
                  color: "#b7b7b7",
                  padding: 0,
                  justifyContent: "flex-start",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                <Box>
                  <Typography fontWeight="bold">
                    {diretrizes[0].title}
                  </Typography>
                  <Typography sx={{ color: "#fff", fontSize: "0.9em" }}>
                    {diretrizes[0].description}
                  </Typography>
                </Box>
              </Button>
            </Box>
          )}

          <Box sx={{ marginLeft: "40px", paddingTop: "10px" }}>
            <Header
              title={
                <Box display="flex" alignItems="center" gap={1}>
                  <PlayCircleFilledWhiteIcon
                    sx={{ color: "#5f53e5", fontSize: 30 }}
                  />
                  <Typography>CADASTRAR TAREFAS PARA ESSA DIRETRIZ</Typography>
                </Box>
              }
            />
          </Box>

          {/* Formulário para criar nova tarefa */}
          <Box
            display="flex"
            alignItems="flex-start"
            gap={2}
            marginBottom="30px"
            sx={{ marginLeft: "50px" }}
          >
            {/* TextField */}
            <Box display="flex" alignItems="center" gap={1} width="500px">
              <TextField
                label="Digite uma tarefa..."
                name="nome"
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  style: { position: 'absolute', top: '5px', left: '5px', fontSize: "15px" }
                }}
              />
            </Box>

            {/* Select com Checkboxes */}
            <Box width="320px">
              <Select
                multiple
                name="categoria"
                value={formValues.categoria}
                onChange={handleSelectChange}
                displayEmpty
                fullWidth
                renderValue={(selected) =>
                  selected.length === 0
                    ? "Selecione responsáveis para essa tarefa"
                    : selected.join(", ")
                }
              >
                <MenuItem disabled value="">
                  <ListItemText primary="Selecione responsáveis pelo projeto" />
                </MenuItem>

                {["financeiro", "rh", "marketing", "ti"].map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox
                      checked={formValues.categoria.indexOf(option) > -1}
                    />
                    <ListItemText
                      primary={option.charAt(0).toUpperCase() + option.slice(1)}
                    />
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Botão de Adicionar */}
            <Button
              variant="outlined"
              disableRipple
              sx={{
                minWidth: "40px",
                padding: "5px",
                border: "none",
                marginTop: "5px",
                "&:hover": {
                  boxShadow: "none",
                  border: "none",
                  borderRadius: "50px",
                  backgroundColor: "#f2f0f0",
                },
              }}
            >
              <AddCircleOutlineIcon sx={{ fontSize: 30, color: "#5f53e5" }} />
            </Button>
          </Box>

          <Box sx={{ marginLeft: "40px", paddingTop: "10px" }}>
            <Header
              title={
                <Box display="flex" alignItems="center" gap={1}>
                  <PlayCircleFilledWhiteIcon
                    sx={{ color: "#5f53e5", fontSize: 30 }}
                  />
                  <Typography>CADASTRAR PLANO DE AÇÃO (5W2H) PARA ESSA TAREFA</Typography>
                </Box>
              }
            />
          </Box>

          {/* Formulário 5W2H - 01*/}

          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
              marginTop: "20px",
              marginLeft: "50px",
              marginRight: "50px",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Linha 1 */}
            <Box display="flex" gap={2}>
              <TextField
                label="O que"
                placeholder="Descreva o que deve ser feito"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Por que"
                placeholder="Justificativa do que será feito"
                fullWidth
                variant="outlined"
              />
            </Box>

            {/* Linha 2 */}
            <Box display="flex" gap={2}>
              {/* Quem - Select com Checkboxes */}
              <Box sx={{ flex: 1 }}>
                <Select
                  multiple
                  name="categoria"
                  value={formValues.categoria}
                  onChange={handleSelectChange}
                  displayEmpty
                  fullWidth
                  renderValue={(selected) =>
                    selected.length === 0 ? "Quem..." : selected.join(", ")
                  }
                  sx={{ height: "40px" }}
                >
                  <MenuItem disabled value="">
                    <ListItemText primary="Selecione responsáveis pelo projeto" />
                  </MenuItem>

                  {["financeiro", "rh", "marketing", "ti"].map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox
                        checked={formValues.categoria.indexOf(option) > -1}
                      />
                      <ListItemText
                        primary={
                          option.charAt(0).toUpperCase() + option.slice(1)
                        }
                      />
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Quando */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Quando"
                  placeholder="Período de execução"
                  fullWidth
                  variant="outlined"
                  InputProps={{ sx: { height: "40px" } }}
                />
              </Box>
            </Box>

            {/* Linha 3 */}
            <Box display="flex" gap={2}>
              <TextField
                label="Onde"
                placeholder="Local onde será executada"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Como"
                placeholder="Metodologia de execução"
                fullWidth
                variant="outlined"
              />
            </Box>

            {/* Linha 4 */}
            <Box display="flex" gap={2}>
              <TextField
                label="Digite o valor do orçamento para essa tarefa..."
                name="valor"
                value={formValues.valor}
                onChange={(e) => {
                  const valor = e.target.value;
                  // Remove caracteres não numéricos
                  const onlyNumbers = valor.replace(/[^\d]/g, "");
                  // Converte para formato de moeda
                  const formattedValue = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(onlyNumbers / 100);
                  // Atualiza o estado
                  handleInputChangeReal({
                    target: { name: "valor", value: formattedValue },
                  });
                }}
                fullWidth
              />
            </Box>

            {/* Botão de Adicionar */}
            <Box display="flex" justifyContent="flex-end" marginTop="20px">
              <Button
                variant="contained"
                sx={{
                  marginTop: "20px",
                  backgroundColor: "#5f53e5",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#312783",
                  },
                }}
              >
                SALVAR
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ConteudoDiretriz;
