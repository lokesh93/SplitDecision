from django.conf.urls import include, url
from rest_framework import routers
from . import views
from django.views.decorators.csrf import csrf_exempt

# from django.conf.urls import url, include
# from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'heroes', views.HeroViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'groupmembers', views.GroupMemberViewSet)
router.register(r'debtitems', views.DebtItemViewSet)
router.register(r'debtobligations', views.DebtObligationViewSet)



# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'', include(router.urls)),
    url(r'^additem', csrf_exempt(views.DebtItemView.as_view())),
    url(r'^creategroup/(?P<id>[0-9]+)/$', csrf_exempt(views.GroupCreateView.as_view())),
    url(r'creategroup', csrf_exempt(views.GroupCreateView.as_view())),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]