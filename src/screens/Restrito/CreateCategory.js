import React, { Component } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { connect } from 'react-redux'
import { Button, Segment, Form } from 'semantic-ui-react'
//import timezones from 'moment-timezone/data/meta/latest.json'
import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'
import moment from 'moment'
import { Redirect } from 'react-router-dom'




class CreateCategory extends Component{
   
    state = {
        descricao: '',
        created: moment(),
        error: ''
    }
    
    componentDidMount(){
      
        this.props.reset()
    }
    
    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
        })
    } 

    handleSave = () => {
        const d= moment.tz(this.state.created,this.props.auth.user.timezone)
        const d2 = d.clone().utc().format('YYYY-MM-DD H:mm:ss')
        
               
        this.props.create({
            descricao: this.state.descricao,
            created: d2
        })
            
    }

    render(){

        if(this.props.categories.saved){
            return<Redirect to='/restrito/categories' />
        }
       
        return (
            <div>
                <h1>Criar categoria</h1>
                { this.props.categories.saved && <Segment color = 'green'>Categoria criada com sucesso!</Segment>}
                { !this.props.categories.saved &&
                    <Form>
                        <Form.Field>        
                            <label>Descrição:</label>        
                            <input type='text' value={this.state.descricao} onChange={this.handleChange('descricao')} />
                        </Form.Field>
                        <Form.Field>        
                           <label>Criação:</label>        
                           <input type='text' value={this.state.created.format('DD/MM/YYYY H:mm:ss')} onChange={this.handleChange('created')} />
                        </Form.Field>
                        <InputMoment 
                          moment={this.state.created}
                          onChange={(val) => this.setState({ created: val})}
                        />
                        <div>
                            <Button onClick={this.handleSave}>Criar Categoria</Button>
                        </div>
                    </Form>
                }
              

            </div> 
        )    
    }
}

const mapStateToProps = state =>{
    return {
        auth: state.auth,
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
        create: (category) => dispatch(ActionCreators.createCategoryRequest(category)),
        reset: () => dispatch(ActionCreators.createCategoryReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory)