import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

function OverviewCard({ title, content }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          noWrap
          sx={{ fontWeight: "normal" }}
        >
          {title}
        </Typography>
      </CardContent>

      <CardActions>
        <Typography
          variant="h5"
          color="primary"
          noWrap
          sx={{ ml: 1, mt: 3, fontWeight: "bold" }}
        >
          {content}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default OverviewCard;
