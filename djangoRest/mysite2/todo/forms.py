from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

from .models import Todo



class RegisterForm(UserCreationForm):
    """
    Please work...
    """
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]


class SignInForm(forms.Form):
    username = forms.CharField(label='username', max_length=100)
    password = forms.CharField(label='password', max_length=100)
    

class TodoForm(forms.Form):
    text = forms.CharField(label="text", max_length=2000)
    class Meta:
        model = Todo
        fields = ["text"]
