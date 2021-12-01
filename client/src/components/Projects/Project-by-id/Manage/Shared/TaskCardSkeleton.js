import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

function TaskCardSkeleton() {
  return (
    <Card sx={{ mt: 5, height: 160, position: "relative" }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Skeleton variant="circular" width={12} height={12} />
          <Skeleton sx={{ width: "30%", height: 20, ml: 1 }} />
        </Box>

        <Skeleton variant="rectangular" height={40} sx={{ mt: 3 }} />
      </CardContent>

      <CardActions sx={{ ml: 1, position: "absolute", bottom: 5 }}>
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
      </CardActions>
    </Card>
  );
}

export default TaskCardSkeleton;
