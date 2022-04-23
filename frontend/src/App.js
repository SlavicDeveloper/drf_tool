import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import Footer from './components/footer.js';
import Menubar from './components/menu.js';
import './App.css';
import {render} from 'react-dom';

import UserList from './components/Users.js';
import ProjectItemList from './components/Projects.js';
import ToDoItemList from './components/ToDo.js';

import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import LoginForm from './components/Auth.js';
import ProjectForm from './components/ProjectForm.js';
import TodoForm from './components/TodoForm.js'
import SearchForm from './components/SearchForm.js'

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
           users: [],
           projects: [],
           todos:[],
           token:'',

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
        axios.post('http://185.20.227.90:8000/api-token-auth/', {username: username, password: password})
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

        axios.get("http://185.20.227.90:8000/api/modified_users/")
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => console.log(error))
              this.setState({users: []})

        axios.get('http://185.20.227.90:8000/api/modified_projects/', {headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error))
              this.setState({projects: []})



        axios.get('http://185.20.227.90:8000/api/modified_todo/', {headers})
            .then(response => {
                this.setState({todos: response.data.results})
            }).catch(error => console.log(error))
              this.setState({todos: []})
    }

    delete_project(id){
        const headers = this.get_headers()
        axios.delete('http://185.20.227.90:8000/api/modified_projects/' + id, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    delete_todo(id){
        const headers = this.get_headers()
        axios.delete('http://185.20.227.90:8000/api/modified_todo/' + id, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            })
    }

    create_project(name, users, git_repo){
        const headers = this.get_headers()
        const data = {name: name, users: [users], git_repo: git_repo}
        axios.post('http://185.20.227.90:8000/api/modified_projects/', data, {headers})
            }

    create_todo(project_name, text, creation_date, update_date, users_checklist_author){
        const headers = this.get_headers()
        const data = {project_name: project_name, text: text, creation_date: creation_date, update_date: update_date, users_checklist_author: users_checklist_author}
        axios.post('http://185.20.227.90:8000/api/modified_todo/', data, {headers})
            }



    search_projects(value){
        const headers = this.get_headers()
        axios.get('http://185.20.227.90:8000/api/modified_projects/', {headers})
            .then(response => {
                    this.setState({projects: response.data.results})
                    this.setState({projects: this.state.projects.filter((item) => item.name.includes(value))})

                })

        }


   componentDidMount()
    {
        this.get_token_from_storage()
    }

   render ()
   {
      return (
        <main>
          <div className="App">
            <BrowserRouter>
            <Menubar />
            <SearchForm search_projects={(value) => this.search_projects(value)} />
            <ul>
                Your Projects:
                {this.state.projects.map(item => (
                <li key={item.id}>{item.name}</li>
                ))}
            </ul>
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
                        <Route exact path='/projects' component={() => <ProjectItemList items={this.state.projects} delete_project={(id) => this.delete_project(id)} filterProject = {(e) => this.filterProject(e)}   />} />
                        <Route exact path='/todos' component={() => <ToDoItemList items={this.state.todos} delete_todo={(id) => this.delete_todo(id)}/>}  />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route exact path='/new_projects/create' component={() => <ProjectForm create_project={(name, users, git_repo) => this.create_project(name, users, git_repo)} />} />
                        <Route exact path='/new_todo/create' component={() => <TodoForm create_todo={(project_name, text, creation_date, update_date, users_checklist_author) => this.create_todo(project_name, text, creation_date, update_date, users_checklist_author)} />} />

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