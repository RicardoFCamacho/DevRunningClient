import React from 'react'

const Distance = ({ distance, metric }) => {    // é o mesmo que const Distance = props => {
    let distanceStr = ''  
    // considerar o padrão sistema metrico
    if(metric==='metric'){
      distanceStr = distance.toFixed(2) + ' km'
    }else{
      //milhas
      //1km = 0,62371mi
      const distanceMi = distance * 0.621371
      distanceStr = distanceMi.toFixed(2) + 'mi'
  
    }
  
    return <span>{distanceStr}</span>
  }

  export default Distance