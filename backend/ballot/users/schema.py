from graphene_django import DjangoObjectType
import graphene
import graphql_jwt
from django.http import JsonResponse
from graphene import relay
from django.contrib.auth.models import User


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        interface = (relay.Node,)


class Query(graphene.ObjectType):
    me = graphene.Field(UserNode)
    users = graphene.List(UserNode)
    viewer = graphene.Field(UserNode)

    def resolve_viewer(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Not logged in!')
        return user

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserNode)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = User(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    # delete_refresh_token_cookie = graphql_jwt.refresh_token.DeleteRefreshTokenCookie.Field()
    create_user = CreateUser.Field()
