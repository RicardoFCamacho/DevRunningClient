import React, { Component } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Segment, Form } from 'semantic-ui-react'

class EditUser extends Component{
        
    state = {
        name: '',
        email: '',
        role: '',
        error: ''
            
    }

    componentDidMount(){
      //  this.handleChange = this.handleChange.bind(this)
      //  this.handleSave = this.handleSave.bind(this)

       // this.props.reset()
        //disparar o LOAD do mapDispatchToProps     
        this.props.load(this.props.match.params.id)
        
        console.log(this.props.match.params.id)
    }
    
    //enviando os dados para o state
    // getDerivedStateFromProps => pega o estado derivado de props
    static getDerivedStateFromProps(newProps, prevState){
        //console.log(newProps.users)
        if(newProps.users && newProps.users.user){
          const user = {} 
          const u = newProps.users.user
            
            if(u.name !== prevState.name){
                user.name = newProps.users.user.name
            }    
            if(u.email !== prevState.email){
               user.email = newProps.users.user.email
            }    
            if(u.role !== prevState.role){
              user.role = newProps.users.user.role
            }
            
            return user
        }
        return null
        
    }
    
    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
            // [fieldname]: event.target.value.substr(0,20) ===> se quizer limitar qtde de caracteres
        })
    } 

    handleSave = () => {
        //disparar o SAVE do mapDispatchToProps                  
        this.props.save({
            id: this.props.match.params.id,
            name: this.state.name,
            email: this.state.email,
            role: this.state.role
            
        })
            
    }

    render(){
       // console.log(this.state)
        if(this.props.users.saved){
            return<Redirect to='/admin/users' />
        }
        return (
            <div>
                <h1>Editar usuário</h1>

                { this.props.users.saved && <Segment color = 'green'>Usuário editado com sucesso!</Segment>}
                { !this.props.users.saved &&
                    <Form >
                       <Form.Field>        
                           <label>Name:</label> 
                               <input type='text' value={this.state.name} onChange={this.handleChange('name')} />
                        </Form.Field>
                   
                        <Form.Field>        
                           <label>E-mail:</label>        
                               <input type='email' value={this.state.email} onChange={this.handleChange('email')} />
                        </Form.Field>

                        <Form.Field>        
                           <select value={this.state.role} onChange={this.handleChange('role')}>
                               <option value='admin'>Administrador</option>
                               <option value='user'>Usuário</option>
                           </select>  
                        </Form.Field>
                   
                        <div>
                            <Button onClick={this.handleSave}>Salvar Usuário</Button>
                        </div>
                    </Form>
                 
                }

            </div>

        )    
    }

}

const mapStateToProps = state =>{
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: user => dispatch(ActionCreators.updateUserRequest(user)),
        reset: () => dispatch(ActionCreators.updateUserReset()),
        load: id => dispatch(ActionCreators.getUserRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)