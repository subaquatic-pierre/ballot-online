import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from "react-router-dom";
import gql from 'graphql-tag';
import { useHistory, Redirect, useLocation } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import {
    CircularProgress,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    FormControl,
    Grid,
    Radio,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Box,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';

import Alert from '../components/Alert'

const QUESTION_QUERY = gql`
query GetQuestion($questionId:String!){
    question(questionId:$questionId){
      title
      choices {
        id
        title
      }
      voteSet {
        id
        choice {
          title
          id
        }
      }
      created
      questionType
    }
  }
`

const CREATE_VOTE = gql`
    mutation CreateVote($choiceId:String!, $questionId:String!) {
        createVote(choiceId:$choiceId, questionId:$questionId){
            vote {
                question {
                    id
                    title
                }
                choice {
                    id
                    title
                }
                user {
                    id
                    username
                }
            }
        }
    }
`

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: '1rem 0'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    loadderRoot: {
        display: 'flex',
        justifyContent: 'center'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cardBottom: {
        display: 'flex',
        justifyContent: 'center'
    },
    choiceBox: {
        padding: '2rem'
    },
    textInput: {
        marginTop: '2rem'
    },
    numVotesCard: {
        margin: '2rem 0',
        padding: '2rem',
        width: '100%'
    }
}));

const Question = props => {
    const question_id = props.match.params.id
    const classes = useStyles()
    const [createVote] = useMutation(CREATE_VOTE)
    const [choiceValue, setChoiceValue] = React.useState('');
    const [validate, setValidate] = React.useState('');
    const [votes, setVotes] = React.useState([])
    const username = localStorage.getItem('token')
    const location = useLocation();
    const history = useHistory()

    const handleChoiceChange = (event) => {
        setChoiceValue(event.target.value);
    };

    // Create a vote
    const handleClick = (event) => {
        if (!username) {
            return setValidate('Please enter username')
        }
        if (!choiceValue) {
            return setValidate('Please make a valid choice')
        }
        createVote(
            {
                variables: {
                    choiceId: choiceValue,
                    questionId: question_id,
                }
            }
        ).then(res => {
            console.log(res)
            history.go()
            return <Redirect push to="/" />
        }).catch(err => {
            console.log(err)
        })
    }

    // Get initial question info
    const { loading, error, data } = useQuery(
        QUESTION_QUERY,
        {
            variables: {
                questionId: question_id
            },
            fetchPolicy: "network-only",
            onCompleted: data => {
                createVotes(data)
            },
        }
    )

    const createVotes = (data) => {
        const localVotes = []
        data.question.choices.forEach(choice => {
            const choiceObj = {
                title: choice.title,
                votes: getNumberVotes(choice.id)
            }
            localVotes.push(choiceObj)
        })
        setVotes(localVotes)
    }

    // Get number of votes
    const getNumberVotes = (choice_id) => {
        const votes = data.question.voteSet
        let count = 0
        votes.forEach(vote => {
            if (vote.choice.id === choice_id) {
                count++
            }
        })
        return count
    }

    return (
        <>
            <Typography variant='h1'>Question</Typography >
            <Grid container justify='center'>
                <Grid container item sm={6} direction='column' xs={12}>
                    <Card className={classes.root}>
                        {loading ?
                            <div className={classes.root}>
                                <CircularProgress />
                            </div>
                            :
                            error ?
                                <div>
                                    <Alert severity="error">{error.message}</Alert>
                                </div>
                                :
                                validate ?
                                    <div>
                                        <Alert severity="error">{validate}</Alert>
                                    </div>
                                    :
                                    <>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {data && data.question.title}
                                            </Typography>
                                            <Typography variant="body2" component="h2">
                                                {data && data.question.subtitle}
                                            </Typography>
                                            <Box className={classes.choiceBox}>
                                                <form noValidate autoComplete="off">
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">Choices:</FormLabel>
                                                        <RadioGroup aria-label="choices" name="choices" value={choiceValue} onChange={handleChoiceChange}>
                                                            {data.question.choices.map(choice => (
                                                                <FormControlLabel key={choice.id} value={choice.id} control={<Radio />} label={choice.title} />
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </form>
                                            </Box>
                                        </CardContent>
                                        <CardActions className={classes.cardBottom}>
                                            <Button onClick={handleClick} variant='contained'>Cast your Vote</Button>
                                        </CardActions>
                                    </>
                        }
                    </Card>
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Grid container item xs={6}>
                    <Card className={classes.numVotesCard}>
                        <Typography variant='h6'>
                            Number of votes
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    <b>Choice ---|--- Number of votes</b>
                                </ListItemText>
                            </ListItem>
                            {votes.map((choice, index) => (
                                <ListItem key={index}>
                                    <ListItemText>
                                        {choice.title} - {choice.votes}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </>

    )
}

export default withRouter(Question);