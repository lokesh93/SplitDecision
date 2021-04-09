from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.views.static import serve
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
    url(r'app', views.index, name='index'),
    url(r'about', views.index, name='index'),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)