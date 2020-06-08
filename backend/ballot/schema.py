import graphene
import graphql_jwt

import ballot.questions.schema
import ballot.users.schema


class Mutation(
        ballot.users.schema.Mutation,
        ballot.questions.schema.Mutation,
        graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


class Query(
        ballot.users.schema.Query,
        ballot.questions.schema.Query,
        graphene.ObjectType):
    pass


schema = graphene.Schema(
    query=Query,
    mutation=Mutation
)
