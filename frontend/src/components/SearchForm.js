import React from 'react'

class SearchForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            "value": '',
        }
    }

    handleChange(event)
         {
            this.setState(
                    {
                        value: event.target.value
                    }
                );

        }

    handleSubmit(event)
        {
          this.props.search_projects(this.state.value)
          event.preventDefault()
        }

    render()
        {
        return(
        <form onSubmit={(event)=> this.handleSubmit(event)}>
                    <div className="search-class">
                        <label for="search">Search Your Projects</label>
                            <input type="text" className="form-control" placeholder="Search..." value = {this.state.value} onChange = {(event) => this.handleChange(event)} />
                            <button type="submit"> Search</button>
                    </div>
        </form>
        );
    }
}

export default SearchForm;