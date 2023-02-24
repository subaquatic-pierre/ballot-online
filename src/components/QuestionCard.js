import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

import { useMutation, gql } from "@apollo/client";
import { useLocation } from "@reach/router";
import { makeStyles } from "@material-ui/core";
import { navigate } from "gatsby";

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($questionId: String!) {
    deleteQuestion(questionId: $questionId) {
      question {
        id
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: "1rem 0",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const QuestionCard = (props) => {
  const location = useLocation();
  const { id, title, subtitle, choices, isStaff } = props;
  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleDeleteClick = (question_id) => {
    deleteQuestion({ variables: { questionId: question_id } })
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleMakeVoteClick = (id) => {
    const username = localStorage.getItem("token");
    if (!username) {
      navigate("/login");
    } else {
      navigate(`/question/${id}`);
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Question:
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {subtitle}
        </Typography>
        {choices &&
          choices.map((choice) => (
            <Typography key={choice.id} variant="body2" component="p">
              {bull}
              {choice.title}
            </Typography>
          ))}
      </CardContent>
      <CardActions>
        <Button
          onClick={() => handleMakeVoteClick(id)}
          variant="contained"
          color="primary"
          size="small"
        >
          Make Your Vote
        </Button>
        {isStaff && (
          <Button
            onClick={() => handleDeleteClick(id)}
            variant="contained"
            size="small"
          >
            Delete Question
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
