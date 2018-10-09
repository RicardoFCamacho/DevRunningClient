// conectando alguns componentes ao redux
import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from '../../../redux/actionCreators'

import { Link } from 'react-router-dom'

import { Menu, Dropdown, Image } from 'semantic-ui-react'

const Header = props => {
    return(
      <Menu>
            
            <Menu.Item as={Link} to='/'><Image src={'/logo.png'} size='small'/>Corridas Online - <b>Admin</b></Menu.Item>
            <Menu.Item as={Link} to='/admin'>Home</Menu.Item>
            <Menu.Item as={Link} to='/admin/users'>Usuários</Menu.Item>
            <Menu.Item as={Link} to='/admin/runs'>Corridas</Menu.Item>
            <Menu.Item as={Link} to='/admin/categories'>Categorias</Menu.Item>

            <Menu.Menu position='right'>
                <Dropdown item text={props.auth.user.name}>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to='/restrito'>Modo: usuário</Dropdown.Item>     
                        <Dropdown.Item as={Link} to='/restrito/my-account'>Minha conta</Dropdown.Item>             
                        <Dropdown.Item as={Link} to='/restrito/change-password'>Alterar senha</Dropdown.Item>
                        <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
            
           
      </Menu>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

//Disparando a action 
const mapDispatchToProps = dispatch => {
    return {
        signin: (email, passwd) => ActionCreators.signinRequest(email, passwd),
        logout: () => dispatch(ActionCreators.destroyAuthRequest())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)