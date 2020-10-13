import React, { useState } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonMenu,
  IonList,
  IonButton,
  IonText,
  IonApp,
  IonCol,
  IonRow,
  IonInput,
  IonItem,
} from "@ionic/react";

import data from "../data/dummy.json";

import axios from "axios";

import { colorFill } from "ionicons/icons";

// interface SyntheticEvent<T> {
//   currentTarget : event & FormEvent<HTMLIonInputElement>
// }

class Home extends React.Component<
  {},
  {
    pkgs: number | null;
    col: string;
    text: string;
    num: number;
    inputVal: string | undefined | null;
    token: any;
    username: string | undefined | null;
    password: string | undefined | null;
    posts: any;
    todo: any;
    userID: number | null
  }
> {
  constructor(props: number) {
    super(props);
    this.state = {
      pkgs: null,
      col: "primary",
      text: "OK",
      num: 0,
      inputVal: "",
      token: "",
      username: "",
      password: "",
      posts: "",
      todo: "",
      userID: null,
    };
  }

  changeCol = () => {
    let newCol = this.state.col == "warning" ? "primary" : "warning";
    let newTxt = this.state.text == "OK" ? "Warning" : "OK";
    this.setState({ text: newTxt });
    this.setState({ col: newCol });
    this.setState({ num: this.state.num + 1 });
    console.log("current state is", this.state);
  };

  update = () => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
      // body: JSON.stringify({ username: "Ike", password: "supersecret123" }),
    };
    fetch("http://127.0.0.2:9000/todo/api-token-auth/", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ token: data.token }));
    console.log(this.state.token);
  };

  getTodo = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        Authorization: "Token " + this.state.token,
      }, //,
      // body: JSON.stringify({ username: "Ike", password: "supersecret123" }),
    };
    fetch("http://127.0.0.2:9000/todo/api/todo", requestOptions)
      .then((response) => response.json())
      .then((data) => (
        
        this.state.userID === null ? this.setState({ posts: data, userID: data[0].user }) : this.setState({ posts: data })
        
        
        
        
    
    
    
      ))
    console.log(this.state.posts);
  };

  handleUsernameChange = (e: any) => {
    console.log("Changing Username...");
    console.log(e.target.value);
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e: any) => {
    console.log("Changing Password");
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  };

  handleTodoChange = (e: any) => {
    console.log(e.target.value);
    this.setState({ todo: e.target.value });
  };

  handleSubmit = () => {
    console.log(this.state.todo);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        Authorization: "Token " + this.state.token,
      },
      // body: JSON.stringify({ username: this.state.username, password: this.state.password }),
      body: JSON.stringify({ user: this.state.userID, text: this.state.todo }),
    };
    fetch("http://127.0.0.2:9000/todo/api/todo/", requestOptions)
    
    .then( () => this.getTodo())
    // .then((response) => response.json())
    // .then((data) => this.setState({ token: data.token }));

  };

  deletePost:any = (post: any) => {
    console.log("I am going to delete", post);
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        Authorization: "Token " + this.state.token,
      },
      // body: JSON.stringify({ username: this.state.username, password: this.state.password }),
      // body: JSON.stringify({ user: 11, text: this.state.todo }),
    };
    const URI = "http://127.0.0.2:9000/todo/api/todo/" + post.id
    fetch(URI, requestOptions)
    .then((response) => response.json())
    .then((message) => console.log(message))
    setTimeout(2000)
    // .then((data) => this.setState({ token: data.token }));
    this.getTodo();
  };
  

  render() {
    const { pkgs, col, num, token, posts } = this.state;
    return (
      <React.Fragment>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Demo - Django REST API</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <br></br>
          <IonButton onClick={this.update}>
            Get Token (Authenticate User)
          </IonButton>
          <IonText>
            Token:
            {/* {token} */}
          </IonText>
          <IonItem>
            <IonInput value={token}></IonInput>
          </IonItem>
          <IonText>
            <p>Default user: Ike</p>
            <p>Password: supersecret123</p>
          </IonText>
          <IonItem>
            <IonInput
              placeholder="Username"
              onIonChange={this.handleUsernameChange}
            ></IonInput>
            <IonInput
              placeholder="Password"
              onIonChange={this.handlePasswordChange}
            ></IonInput>
          </IonItem>
          {!!token && (
            <IonButton onClick={this.getTodo}>Refresh Posts</IonButton>
          )}
          <IonText>
            {!!posts === true && (
              <>
                <h1>Your Posts:</h1>
                <ul>
                  {posts.map((data: any, index: any) => (
                    <>
                      <li id={index}>{data.text}</li>
                      <form onSubmit={(e) => {e.preventDefault(); this.deletePost(posts[index])}}>
                      <IonButton id={index} type="submit">Delete</IonButton>
                      </form>
                    </>
                  ))}
                </ul>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.handleSubmit();
                  }}
                >
                  <IonInput
                    placeholder="Enter your to-do post here"
                    onIonChange={this.handleTodoChange}
                  ></IonInput>
                  <IonButton type="submit">Submit post</IonButton>
                </form>
              </>
            )}
            <br>
            </br>
            <br></br>
            <br></br>

            <br></br>

          </IonText>
        </IonContent>
      
      </React.Fragment>
    );
  }
}

export default Home;
