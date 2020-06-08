from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', jwt_cookie(GraphQLView.as_view(graphiql=True))),
    path('accounts/', include('allauth.urls')),
    path('', include('ballot.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
