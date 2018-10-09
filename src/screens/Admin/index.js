//foi criado como index.js pois aqui tera subRotas
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './elements/Header'
import Runs from './Runs'
import Categories from './Categories'
import EditCategory from './EditCategory'
import Users from './Users'
import EditUser from './EditUser'

const Home = props => <h1> Home Admin </h1>



const Admin = props => {
    if(!props.auth.isAuth){  //se não estiver logado
       return <Redirect to ='/login' />
    }
    if(props.auth.user.role !== 'admin'){
      return <Redirect to ='/restrito' />  
    }
    return(
        <div>
            <Header />

              {/* {`${props.match.path}/`} pega a path(/admin) do Link */}
              <Route exact path={`${props.match.path}/`} component={Home} /> { /* subRota Home da rota Admin */ }
              <Route exact path={`${props.match.path}/users/:id/edit`} component={EditUser} />
              <Route exact path={`${props.match.path}/users`} component={Users} />{ /* subRota Users da rota Admin */ }     
              <Route exact path={`${props.match.path}/categories/:id/edit`} component={EditCategory} />
              <Route exact path={`${props.match.path}/categories`} component={Categories} />
              <Route path={`${props.match.path}/runs`} component={Runs} />


        </div>

    )
}    

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Admin)
