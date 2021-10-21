import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ItemCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [count, setCount] = React.useState(1);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addItemToCart = () => {
    axios
      .post("https://fakestoreapi.com/carts", {
        userId: 1,
        date: "2020-02-03",
        products: [{ productId: props.productId, quantity: 1 }],
      })
      .then((response) => {
        alert("Add to cart item id " + response.data._id);
        console.log(response.data);
      });
  };
  return (
    <Card
      sx={{
        height: "440px",
        width: "230px",
        maxWidth: 345,
        margin: "14px",
        marginLeft: "5px",
        // display: "flex",
        // justifyContent: "center",
        padding: "5px",
      }}
    >
      <CardHeader
        sx={{
          padding: "10px",
        }}
        title={props.title.substring(0, 23)}
        subheader={"$" + props.price}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.category}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <RemoveCircleOutlineIcon
            onClick={() => {
              setCount(count > 1 ? count - 1 : 1);
            }}
          />
        </IconButton>
        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
          {count}
        </Avatar>
        <IconButton aria-label="share">
          <AddCircleOutlineIcon
            onClick={() => {
              setCount(count > 0 ? count + 1 : 1);
            }}
          />
        </IconButton>
        <Button
          style={{ fontSize: "10px" }}
          variant="contained"
          size="small"
          onClick={() => {
            addItemToCart();
          }}
        >
          Add To Cart
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{props.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
