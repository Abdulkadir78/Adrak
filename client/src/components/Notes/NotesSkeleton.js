import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";

function NotesSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton sx={{ width: "50%" }} />
        <Skeleton variant="rectangular" height={40} sx={{ mt: 3 }} />
      </CardContent>
    </Card>
  );
}

export default NotesSkeleton;
