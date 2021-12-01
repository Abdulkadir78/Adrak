import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { addProject, updateProject } from "../../store/projects/side-effects";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useProjectsSelector from "../../hooks/selectors/useProjectsSelector";
import ProgressAbsolute from "../Shared/Loaders/ProgressAbsolute";
import projectSchema from "../../validation-schemas/project";
import PaperContainer from "../Auth/PaperContainer";
import ChipInput from "../Shared/ChipInput";
import Error from "../Shared/Alerts/Error";
import Brand from "../Shared/Brand";
import Input from "../Shared/Input";

function ProjectForm({ project, handleClose }) {
  // project prop will only be there in case of update, undefined otherwise
  const [chips, setChips] = useState([]);
  const { loading, addError, updateError } = useProjectsSelector();

  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const xsWidth = width - width / 10;

  useEffect(() => {
    project && setChips(project.technologies);
  }, [project]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const handleAddChip = useCallback((chip) => {
    setChips((prevChips) => [...prevChips, chip]);
  }, []);

  const handleDeleteChip = useCallback((id) => {
    setChips((prevChips) => {
      return prevChips.filter((chip) => (chip.id || chip._id) !== id);
    });
  }, []);

  const onSubmit = (data) => {
    const newProject = { ...data, technologies: chips };

    if (project) {
      let isChanged = false;
      for (const key of Object.keys(newProject)) {
        // Not deep comparing technologies (array) beacuse newProject.technologies
        // is a shallow copy of project.technologies unless it is changed (chip added/deleted)
        // in which case we want to perform an update anyway.
        if (project[key] !== newProject[key]) {
          isChanged = true;
          break;
        }
      }

      if (!isChanged) {
        handleClose?.();
        return;
      }
    }

    (!project
      ? dispatch(addProject(newProject))
      : dispatch(updateProject({ projectId: project._id, project: newProject }))
    )
      .unwrap()
      .then(
        () => {
          handleClose?.();
        },
        () => {}
      );
  };

  return (
    <PaperContainer>
      {loading && <ProgressAbsolute />}

      <Brand />
      <Typography mt={1} mb={4}>
        {!project ? "Create a project" : "Update project"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {addError && <Error error={addError} />}
        {project && updateError && <Error error={updateError} />}

        <Input
          fullWidth
          type="text"
          label="name"
          defaultValue={project?.name}
          register={register}
          errors={errors}
          rules={projectSchema.name}
          disabled={loading}
          autoFocus
        />

        <Input
          fullWidth
          multiline
          rows={4}
          type="text"
          label="description"
          defaultValue={project?.description}
          register={register}
          errors={errors}
          rules={projectSchema.description}
          disabled={loading}
        />

        <ChipInput
          fullWidth
          type="text"
          label="technologies"
          halfMargin
          chips={chips}
          handleAddChip={handleAddChip}
          handleDeleteChip={handleDeleteChip}
          xsScreen={xsScreen}
          xsWidth={xsWidth}
          disabled={loading}
        />

        <Box textAlign="center" mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            disabled={loading}
          >
            {!project ? "Create" : "Update"}
          </Button>
        </Box>
      </form>
    </PaperContainer>
  );
}

export default ProjectForm;
