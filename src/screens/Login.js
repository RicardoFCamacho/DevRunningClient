import React from 'react'
import { Component } from 'react'
import ActionCreator from '../redux/actionCreators'
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import Header from '../Header'

/*
Admin: 
tuliofaria@devpleno.com
abc123

user:
ze@dominio.com
abc123
*/

class Login extends Component{
    state = {
        form: {
          email: '',
          passwd: ''  
        }
    }
    
    handleChange = fieldname => event => {
        const form = {
            ...this.state.form //pegando tudo do form(uma copia do form)
        }
        form[fieldname] = event.target.value //pegando o valor que veio do form 
        this.setState({ form }) // setando o form aqui no Login.js
        //console.log(fieldname, event.target.value)
    }

    login = () => {
        const{ email, passwd } = this.state.form
        this.props.login(email, passwd)
    
        console.log(this.props.login)
    
    }

    render(){
    //    console.log(this.props.auth.isAuth)
        if(this.props.auth.isAuth){
           if(this.props.auth.user.role ==='admin'){
               return <Redirect to='/admin' />
            }  
            return <Redirect to='/restrito' />
           
        }
        return (
            <div>
                <Header />
                <h1>Entrar</h1>
                <Form>
                    {/* JSON.stringify(this.props) */}  
                    {/* onChange -> toda vez que alterar o valor do componente
                    ira SETA esse valor no STATE do componente */}
                    <Form.Field>
                        <label>E-mail</label>
                        <input type='text' value={this.state.form.email} onChange={this.handleChange('email')} />
                    </Form.Field>
                    <Form.Field>
                        <label>Senha</label>
                        <input type='password' value={this.state.form.passwd} onChange={this.handleChange('passwd')} />
                    </Form.Field>
                    
                    <Button onClick={this.login}>Logar</Button>   
                    {
                        this.props.auth.error &&
                        <p>Erro ao logar</p>
                    }
                </Form>
            </div>
        )
    }


}



const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (email, passwd) => dispatch(ActionCreator.signinRequest(email, passwd))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)