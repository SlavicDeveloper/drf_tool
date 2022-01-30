import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import Footer from './components/footer.js';
import Menubar from './components/menu.js';
import './App.css';
import UserList from './components/Users.js';
import ProjectItemList from './components/Projects.js';
import ToDoItemList from './components/ToDo.js';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

const NotFound404 = ({ location }) => {
  return (
    <div>
        <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects':[],
           'todos':[]
       }
   }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/modified_users")
            .then(response => {
                const users = response.data.results
                    this.setState(
                    {
                        "users":users
                    }
                )
            }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/api/modified_projects")
            .then(response => {
                const projects = response.data.results
                    this.setState(
                    {
                        "projects": projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/api/modified_todo")
            .then(response => {
                const todos = response.data.results
                    this.setState(
                    {
                        "todos": todos
                    }
                )
            }).catch(error => console.log(error))

    }

   render () {
       return (

          <div className="App">
            <BrowserRouter>
                <nav>
                   <ul>
                    <li>
                        <Link to='/'>Users</Link>
                    </li>
                    <li>
                        <Link to='/projects'>Projects</Link>
                    </li>
                    <li>
                        <Link to='/todos'>Todos</Link>
                    </li>
                   </ul>
                </nav>
                <Switch>
                        <Route exact path='/' component={() => <UserList items={this.state.users} />}  />
                        <Route exact path='/projects' component={() => <ProjectItemList items={this.state.projects} />}  />
                        <Route exact path='/todos' component={() => <ToDoItemList items={this.state.todos} />}  />
                        <Route component={NotFound404} />
                </Switch>
              </BrowserRouter>
          </div>


       )
   }
}

export default App;