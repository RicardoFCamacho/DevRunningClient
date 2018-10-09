import React, { Component } from 'react'
import ActionCreators from '../../redux/actionCreators'
import { connect } from 'react-redux'
import { Table, Button, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import DateStr from '../elements/DateStr'

class Categories extends Component{
    componentDidMount(){
        this.props.load()
      
    }
    renderCategory = (category) => {
       
        return(
            <Table.Row key={category.id}>
                
                <Table.Cell>
                  {category.id}
                </Table.Cell>
                <Table.Cell>
                  {category.descricao}
                </Table.Cell>
                <Table.Cell>
                   <DateStr date={category.created} timezone={this.props.auth.user.timezone}/>
                </Table.Cell>
                <Table.Cell>
                  <Button basic color='blue' as={Link} to={`/admin/categories/${category.id}/edit`}>Editar</Button> 
                  <Button basic color='red' onClick={() =>this.props.remove(category.id)}>Remover</Button>
              </Table.Cell>
            </Table.Row>
        )
    }
    render(){
        
        return (
            <div>
                <h1>Categorias</h1>
                <Button as={Link} to='/restrito/create-category'>Nova Categoria</Button>
                { this.props.categories.isLoading && <p>Carregando...</p>}
                { !this.props.categories.isLoading && this.props.categories.data.length === 0 && <Segment color='blue'>Nenhuma categoria cadastrada...</Segment>}
                { !this.props.categories.isLoading && this.props.categories.data.length > 0 && <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Descrição</Table.HeaderCell>
                            <Table.HeaderCell>Data</Table.HeaderCell>
                            <Table.HeaderCell>Ações</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.categories.data.map(this.renderCategory)}
                    </Table.Body>
                </Table> } 
            </div> 
        )    
    }
}

const mapStateToProps = state =>{
    return {
        categories: state.categories,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
      load:() => dispatch(ActionCreators.getCategoriesRequest(true)),  
      create: (category) => dispatch(ActionCreators.createCateoryRequest(category)),
      remove: id => dispatch(ActionCreators.removeCategoryRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)