from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models import Todo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class TodoSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField('get_username')

    def get_username(self, foo):
        user_id = foo.user
        # username = User.objects.get(id=user_id).first().username
        return str(user_id)


    class Meta:
        model = Todo
        fields = ('id', 'user', 'text', 'is_completed', 'date_created', 'username')

