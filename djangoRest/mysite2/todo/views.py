from django.contrib.auth import login, authenticate, user_logged_in, logout, login
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import View
from django.contrib.auth.decorators import login_required

from .forms import RegisterForm, SignInForm, TodoForm

from .models import Todo
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .serializers import TodoSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework.permissions import IsAuthenticated


#Sign up user
def signup_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
        return redirect(home_view)
    else:
        form = RegisterForm()
    return render(request, "signup.html", {"form":form})

# log user in
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect(home_view)
    form = AuthenticationForm()
    return render(request, "login.html",{'form':form})

# edit TODO item
@login_required
def edit_view(request, todo_id):
    text = Todo.objects.get(pk=todo_id).text
    if request.method == "POST":
        new_text = request.POST.get('edit_data')
        Todo.objects.filter(pk=todo_id).update(text=new_text)
        return redirect(home_view)
    return render(request, "edit.html", {'text' : text})

# home page for logged in user
@login_required
def home_view(request):
    if request.method == 'POST':
        text = str(request.POST.get('key'))
        t = Todo(user=request.user, text=text, is_completed=False)
        t.save()
    todos = Todo.objects.filter(user=request.user)
    context = {
        'name' : request.user,
        'todos' : todos,
    }
    return render(request, 'home.html', context)

# Delete a TODO item
def delete_view(request, todo_id):
    if request.user.is_authenticated:
        t = Todo.objects.get(pk=todo_id)
        t.delete()
        return redirect(home_view)
    return redirect(login_view)

# Log user out
def logout_view(request):
    logout(request)
    return redirect(login_view)


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        # pk = User.objects.filter(username=self.request.user).first().id
        # print(self.request.user)
        # print(self.request.user)
        # self.request.user = User.objects.filter(username=self.request.user).first().id
        # print("Your primary key is ", pk)
        # print("Username =",self.request.username)
        # print(Todo.objects.filter(user=pk).first().id)
        print(self.request)
        print('----')
        print(dir(self.request))
        return Todo.objects.filter(user=self.request.user)
        # return Todo.objects.all()
        

class ClassBasedView(View):
    def get(self, request):
        return HttpResponse("Greetings, from ClassBasedView.get()")
    def post(self, request, *args, **kwargs):
        return HttpResponse("This is post!")

def index(request):
    return HttpResponse(f"Hello World, from todo.views.index()!")

