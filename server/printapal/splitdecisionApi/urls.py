from django.conf.urls import include, url
from rest_framework import routers
from . import views

# from django.conf.urls import url, include
# from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'heroes', views.HeroViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'groupmembers', views.GroupMemberViewSet)



# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'', include(router.urls)),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]