import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import NotesIcon from "@mui/icons-material/Notes";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { getProjectById } from "../../../store/projects/side-effects";
import useProjectsSelector from "../../../hooks/selectors/useProjectsSelector";
import Spinner from "../../Shared/Loaders/Spinner";
import StyledLink from "../../Shared/StyledLink";
import Snack from "../../Shared/Alerts/Snack";
import Overview from "./Overview/Overview";
import NoData from "../../Shared/NoData";
import Manage from "./Manage/Manage";

const tabValues = ["overview", "manage"];

function TabPanel({ children, value, index, ...props }) {
  return (
    <Box hidden={value !== index} mb={4} {...props}>
      {value === index && children}
    </Box>
  );
}

function Project({ projectId }) {
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const search = location.search;

  const { project, projectError } = useProjectsSelector();
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  useEffect(() => {
    const tab = new URLSearchParams(search).get("tab");
    if (tab) {
      const index = tabValues.findIndex((val) => val === tab);
      index >= 0 && setTabValue(index);
    }
  }, [search]);

  useEffect(() => {
    dispatch(getProjectById(projectId))
      .unwrap()
      .finally(() => {
        setLoading(false);
      });
  }, [projectId, dispatch]);

  const handleTabValueChange = (e, value) => {
    const tabName = tabValues[value];
    history.replace({ pathname: location.pathname, search: `tab=${tabName}` });
    setTabValue(value);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      {projectError && <Snack severity="error" message={projectError} />}

      {!project ? (
        <NoData imgAlt="No project data" />
      ) : (
        <>
          <Paper
            sx={{
              width: smScreen ? "100%" : "50%",
              mt: smScreen ? 0 : -4,
              mb: 4,
              mx: "auto",
            }}
          >
            <Tabs
              variant="fullWidth"
              value={tabValue}
              onChange={handleTabValueChange}
            >
              <Tab label="Overview" />
              <Tab label="Manage" />
            </Tabs>
          </Paper>

          <Box
            display={xsScreen ? (tabValue === 0 ? "block" : "flex") : "flex"}
            justifyContent="space-between"
            alignItems="center"
            mb={5}
          >
            <Typography
              variant="h4"
              noWrap={smScreen}
              sx={{ fontWeight: "bold", wordBreak: "break-word" }}
            >
              {project.name}
            </Typography>

            <Box ml={3} hidden={tabValue === 0}>
              <StyledLink to={`/project/${projectId}/notes`}>
                <Button
                  size={smScreen ? "small" : "medium"}
                  variant="contained"
                  endIcon={<NotesIcon />}
                >
                  Notes
                </Button>
              </StyledLink>
            </Box>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Overview project={project} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Manage projectId={projectId} />
          </TabPanel>
        </>
      )}
    </Container>
  );
}

export default Project;
