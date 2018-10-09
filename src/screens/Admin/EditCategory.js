import React, { Component } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { connect } from 'react-redux'
import { Button, Segment, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
//import InputMoment from 'input-moment'
//import 'input-moment/dist/input-moment.css'
//import moment from 'moment'



class EditCategory extends Component{
       
    state = {
        descricao: '',
       // created: moment(),
        error: ''
        
    }
    
    componentDidMount(){
      
        this.props.reset()
        //disparar o LOAD do mapDispatchToProps     
        this.props.load(this.props.match.params.id)
        //console.log(categories)
    }
    
    

    //enviando os dados para o state
    // getDerivedStateFromProps => pega o estado derivado de props
    static getDerivedStateFromProps(newProps, prevState){
       // console.log(newProps.categories)
     
       if(newProps.categories && newProps.categories.category){
          const category = {} 
          const u = newProps.categories.category
         
            if(u.descricao !== prevState.descricao){
                category.descricao = newProps.categories.category.descricao
            }    
            
            return category
        }
     
        return null
        
    }
    
    /*
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
    */



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
            descricao: this.state.descricao
            //email: this.state.email,
            //role: this.state.role
            
        })
            
    }

    render(){
       // console.log(this.state)
        if(this.props.categories.saved){
            return<Redirect to='/admin/categories' />
        }
        
        return (
            <div>
                <h1>Editar Categoria</h1>
                
                { this.props.categories.saved && <Segment color = 'green'>Categoria editada com sucesso!</Segment>}
                { !this.props.categories.saved &&
                  
                    <Form>
                    
                        <Form.Field>        
                            <label>Descrição:</label>       
                               <input  type='text' Value={this.state.descricao} onChange={this.handleChange('descricao')} />
                        </Form.Field>
                                                
                        <div>
                            <Button onClick={this.handleSave}>Salvar Categoria</Button>
                        </div>
                    
                    </Form>
                   
                }
                

            </div> 
        )    
    }
}

const mapStateToProps = state =>{
    //console.log(state.categories)   
    return {
             
        categories: state.categories
       // auth: state.auth
    }
    
}

const mapDispatchToProps = dispatch => {
   // console.log(id)
    return {
        
        save: category => dispatch(ActionCreators.updateCategoryRequest(category)),
        reset: () => dispatch(ActionCreators.updateCategoryReset()),
        load: id => dispatch(ActionCreators.getCategoryRequest(id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(EditCategory)