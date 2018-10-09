import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import Home from './Home'
import Runs from './Runs'
import MyAccount from './MyAccount'
import ChangePass from './ChangePass'
import Header from './elements/Header'
import CreateRun from './CreateRun'
import Categories from './Categories'
import CreateCategory from './CreateCategory'

const Restrito= props => {
    if(props.auth.isSigningin){
      return <p>Loading...</p>  
    }
    if(!props.auth.isAuth){  //se não estiver logado
      return <Redirect to ='/login' />
    }

    return(
         
        <div>
           <Header />
           {/* {`${props.match.path}/`} pega a path(/admin) do Link */}
           <Route exact path={`${props.match.path}/`} component={Home} /> { /* subRota Home da rota Admin */ }
           <Route path={`${props.match.path}/runs`} component={Runs} />{ /* subRota Users da rota Admin */ }     
           <Route path={`${props.match.path}/my-account`} component={MyAccount} />
           <Route path={`${props.match.path}/change-pass`} component={ChangePass} />
           <Route path={`${props.match.path}/create-run`} component={CreateRun} />
           <Route path={`${props.match.path}/categories`} component={Categories} />
           <Route path={`${props.match.path}/create-category`} component={CreateCategory} />
        </div>

    )
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Restrito)
