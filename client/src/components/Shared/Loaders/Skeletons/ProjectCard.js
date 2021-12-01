import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

function ProjectCard() {
  return (
    <Card sx={{ height: 170, position: "relative" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Skeleton sx={{ width: "30%" }} />
          <Box display="flex">
            <Skeleton
              variant="circular"
              width={25}
              height={25}
              sx={{ mr: 2 }}
            />
            <Skeleton variant="circular" width={25} height={25} />
          </Box>
        </Box>

        <Skeleton variant="rectangular" height={40} sx={{ mt: 3 }} />
      </CardContent>

      <CardActions sx={{ ml: 1, position: "absolute", bottom: 0 }}>
        <Skeleton width={50} height={25} sx={{ mr: 0.5 }} />
        <Skeleton width={50} height={25} />
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
