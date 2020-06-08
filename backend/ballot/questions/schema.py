from graphene_django import DjangoObjectType, DjangoListField
import graphene
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene import relay
from ballot.models import (
    Question,
    Choice,
    Vote,
)
from django.contrib.auth.models import User
from ballot.users.schema import UserNode


class VoteNode(DjangoObjectType):
    class Meta:
        model = Vote
        filter_fields = ['user', 'question', 'choice']
        interface = (relay.Node, )


class VoteType(DjangoObjectType):
    class Meta:
        model = Vote


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question


class QuestionNode(DjangoObjectType):
    class Meta:
        model = Question
        interface = (relay.Node, )


class QuestionConnection(relay.Connection):
    class Meta:
        node = QuestionNode


class ChoiceNode(DjangoObjectType):
    class Meta:
        model = Choice
        interface = (relay.Node, )


class CreateVote(graphene.Mutation):
    # return objects from mutation
    vote = graphene.Field(VoteNode)

    class Arguments:
        # Get user arguments
        choice_id = graphene.String()
        question_id = graphene.String()

    def mutate(self, info, choice_id, question_id):
        # get instances of objects from database with user input arguments
        choice = Choice.objects.get(pk=choice_id)
        # get_or_create returns tuple of instance and true or false if created or not
        user = User.objects.get_or_create(username='pierre')[0]
        question = Question.objects.get(pk=question_id)
        # create new vote object
        vote = Vote.objects.create(
            question=question,
            choice=choice,
            user=user
        )
        # save new vote
        vote.save()

        # Return instance of Createvote mutation
        return CreateVote(
            vote=vote
        )


class CreateQuestion(graphene.Mutation):
    # return objects from mutation
    question = graphene.Field(QuestionNode)

    class Arguments:
        # Get user arguments
        title = graphene.String()
        subtitle = graphene.String()
        question_type = graphene.String()
        choices = graphene.List(graphene.String)

    def mutate(self,
               info,
               title,
               subtitle,
               question_type,
               choices
               ):
        # Create new question
        question = Question(
            title=title,
            subtitle=subtitle,
            expires='2021-10-19',
            question_type=question_type,
        )
        question.save()

        # Get choices sent in from client
        for client_choice in choices:
            choice = Choice.objects.get_or_create(
                title=client_choice
            )[0]
            choice.save()

            # Add choice to the question
            question.choices.add(choice)

        # Return instance of Createvote mutation
        return CreateQuestion(
            question=question,
        )


class DeleteQuestion(graphene.Mutation):
    # return objects from mutation
    question = graphene.Field(QuestionNode)

    class Arguments:
        # Get user arguments
        question_id = graphene.String()

    def mutate(self, info, question_id):
        # get instances of objects from database with user input arguments
        question = Question.objects.get(pk=question_id)
        question.delete()
        # Return instance of Createvote mutation
        # return CreateQuestion(
        #     question=question,
        # )


class Mutation(graphene.ObjectType):
    create_vote = CreateVote.Field()
    create_question = CreateQuestion.Field()
    delete_question = DeleteQuestion.Field()


class Query(graphene.ObjectType):
    questions = relay.ConnectionField(QuestionConnection)
    question = graphene.Field(
        QuestionType, question_id=graphene.String(required=True))

    def resolve_questions(self, info):
        return Question.objects.all()

    def resolve_question(self, info, question_id):
        return Question.objects.get(pk=question_id)
