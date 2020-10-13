from django.urls import path, include
from rest_framework import routers
from . import views
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register('todo', views.TodoViewSet, 'Todo')

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup_view, name='signup_view'),
    path('home/', views.home_view, name='home'),
    path('login/', views.login_view, name='login_view'),
    path('logout/', views.logout_view, name='logout_view'),
    path('home/delete/<int:todo_id>/', views.delete_view, name='delete'),
    path('cls1/', views.ClassBasedView.as_view(), name="class_based_view"),
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),
    path('home/edit/<int:todo_id>', views.edit_view, name='edit_view'),
]