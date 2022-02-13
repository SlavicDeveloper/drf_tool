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
import LoginForm from './components/Auth.js'

import Cookies from 'universal-cookie';

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
           'todos':[],
           'token':''
       }
   }

   set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }

    is_authenticated() {
        return this.state.token != ''
  }

    logout() {
        this.set_token('')
  }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
      }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
      }

    get_headers() {
        let headers = {
          'Content-Type': 'application/json'
        }
      if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
      }

    load_data(){
        const headers = this.get_headers()

        axios.get("http://127.0.0.1:8000/api/modified_users")
            .then(response => {
                const users = response.data.results
                    this.setState(
                    {
                        "users":users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/modified_projects/', {headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error))
              this.setState({projects: []})



        axios.get('http://127.0.0.1:8000/api/modified_todo/', {headers})
            .then(response => {
                this.setState({todos: response.data.results})
            }).catch(error => console.log(error))
              this.setState({todos: []})
    }

    delete_project(id){
        const headers = this.get_headers()
        axios.delete('http://127.0.0.1:8000/api/modified_projects/' + id, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

   render () {
       return (
        <main>
          <div className="App">
            <BrowserRouter>
            <Menubar />
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
                    <li>
                        {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                    </li>
                   </ul>
                </nav>
                <Switch>
                        <Route exact path='/' component={() => <UserList items={this.state.users} />}  />
                        <Route exact path='/projects' component={() => <ProjectItemList items={this.state.projects} delete_project={(id) => this.delete_project(id)} />}  />
                        <Route exact path='/todos' component={() => <ToDoItemList items={this.state.todos} />}  />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route component={NotFound404} />
                </Switch>
                <Footer />
              </BrowserRouter>
          </div>
        </main>
       )
   }
}

export default App;