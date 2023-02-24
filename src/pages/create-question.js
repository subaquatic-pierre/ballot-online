import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import {
  Card,
  Button,
  Typography,
  FormControl,
  Grid,
  FormLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// import DatePicker from "@mui/lab/DatePicker";
import { useMutation, gql } from "@apollo/client";
import DateFnsUtils from "@date-io/date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import Layout from "../components/Layout";
import { navigate } from "gatsby";

const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestion(
    $title: String!
    $subtitle: String!
    $question_type: String!
    $choices: [String!]
  ) {
    createQuestion(
      title: $title
      subtitle: $subtitle
      questionType: $question_type
      choices: $choices
    ) {
      question {
        id
        title
        subtitle
        questionType
        created
        choices {
          id
          title
        }
        voteSet {
          id
          choice {
            id
            title
          }
        }
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "2rem 0",
    padding: "2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginTop: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

const CreateQuestion = (props) => {
  const [title, setTitle] = React.useState("");
  const [createQuestion] = useMutation(CREATE_QUESTION_MUTATION);
  const [subtitle, setSubtitle] = React.useState("");
  const [questionType, setQuestionType] = React.useState("2C");
  const [expires, setExpires] = React.useState(new Date("2040-08-18"));
  const [choices, setChoices] = React.useState([]);
  const [choice, setChoice] = React.useState("");
  const classes = useStyles();

  const handleDateChange = (date) => {
    setExpires(date);
  };

  const handleAddChoice = () => {
    choices.push(choice);
    setChoice("");
  };

  const handleRemoveChoice = (index) => {
    const newChoices = choices.filter((choice, i) => i !== index);
    setChoices(newChoices);
  };

  const handleChoiceTypeChange = (e) => {
    setQuestionType(e.target.value);
    if (e.target.value === "MC") {
      setChoices([]);
    }
  };

  // Load initial array of choices, question type is yes/no
  useEffect(() => {
    if (questionType === "2C") {
      setChoices(["Yes", "No"]);
    }
  }, [questionType]);

  // Main button click to craete the question, server request
  const handleCreateClick = () => {
    createQuestion({
      variables: {
        title: title,
        subtitle: subtitle,
        question_type: questionType,
        choices: choices,
      },
    })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Layout>
      <Typography variant="h1">Create Question</Typography>
      <Grid container jutify="center">
        <Grid item sm={8}>
          <Card className={classes.card}>
            <form className={classes.form} noValidate autoComplete="off">
              <FormControl margin="normal" color="primary" component="fieldset">
                <FormLabel component="legend">Question Type</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={questionType}
                  onChange={handleChoiceTypeChange}
                >
                  <FormControlLabel
                    value="2C"
                    control={<Radio />}
                    label="Two Choices"
                  />
                  <FormControlLabel
                    value="MC"
                    control={<Radio />}
                    label="Multiple Choices"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl margin="normal" fullWidth component="fieldset">
                <FormLabel component="legend">Question Details:</FormLabel>
                <TextField
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Title"
                />
                <TextField
                  id="password"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  label="Subtitle"
                  multiline
                  rows="10"
                />
              </FormControl>
              <FormControl margin="normal" fullWidth component="fieldset">
                <FormLabel component="legend">Expirey Date</FormLabel>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={expires}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider> */}
              </FormControl>
              <FormControl margin="normal" fullWidth component="fieldset">
                <FormLabel component="legend">Choices:</FormLabel>
                <List dense>
                  {choices.map((choice, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemText primary={choice} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleRemoveChoice(index)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
                <TextField
                  id="choice"
                  value={choice}
                  onChange={(e) => setChoice(e.target.value)}
                  label="Choice"
                />
                <Button
                  className={classes.button}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleAddChoice}
                >
                  Add Choice
                </Button>
              </FormControl>
            </form>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleCreateClick}
            >
              Create
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateQuestion;
