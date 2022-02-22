import React from 'react'


class TodoForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            "project_name":'',
            "text": '',
            "creation_date": '',
            "update_date": '',
            "users_checklist_author": '',

        }

    }


    handleChange = (event) =>
        {
            this.setState(
                    {
                        [event.target.name]: event.target.value,

                    }
                ); console.log(event.target.value)

        }

    handleSubmit(event)
        {

          this.props.create_todo(this.state.project_name, this.state.text, this.state.creation_date, this.state.update_date, this.state.users_checklist_author)
          event.preventDefault()

        }

    render()
        {
        return(

            <form onSubmit={(event)=> this.handleSubmit(event)}>
                    <div className="form-group">
                        <label for="name">project_name</label>
                            <input type="text" className="form-control1" name="project_name" value = {this.state.project_name} onChange={(event) => this.handleChange(event)} />
                    </div>


                    <div className="form-group">
                        <label for="Project name">text</label>
                            <input type="text" className="form-control1" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />

                    </div>


                    <div className="form-group">
                        <label for="users_checklist_author">author</label>
                            <input type="text" className="form-control1" name="users_checklist_author" value={this.state.users_checklist_author} onChange={(event)=>this.handleChange(event)} />
                    </div>


                  <input type="submit" className="btn btn-primary" value="Save" />
            </form>
           );
    }
}
export default TodoForm