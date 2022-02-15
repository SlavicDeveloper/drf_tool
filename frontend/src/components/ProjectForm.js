import React from 'react'


class ProjectForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            "name": '',
            "users": [],
            "git_repo": '',
        }
    }


    handleChange(event)
        {
            this.setState(
                    {
                        [event.target.name]: event.target.value,
                        [event.target.users]: event.target.value,
                        [event.target.git_repo]: event.target.value,
                    }
                );
        }

    handleSubmit(event)
        {
          this.props.create_project(this.state.name, this.state.users, this.state.git_repo)
          event.preventDefault()
        }

    render()
        {
        return(<form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="users">users</label>
                        <input type="text" className="form-control" name="users" value={this.state.users} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="git_repo">git_repo</label>
                <input type="text" className="form-control" name="git_repo" value={this.state.git_repo} onChange={(event)=>this.handleChange(event)} />

              </div>
              <input type="submit" className="btn btn-primary" value="Save" />
            </form>);
    }
}
export default ProjectForm