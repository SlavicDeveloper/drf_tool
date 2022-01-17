import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import Footer from './components/footer.js';
import Menubar from './components/menu.js';
import './App.css';
import UserList from './components/Users.js'

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': []
       }
   }
// url:"http://127.0.0.1:8000/api/users"
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/users/")
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        "users":users
                    }
                )
            }).catch(error => console.log(error))

    }

   render () {
       return (
           <div>
               <header>
                    <Menubar />
               </header>
               <main>
                    <UserList users={this.state.users} / >
               </main>
               <Footer />
           </div>
       )
   }
}

export default App;