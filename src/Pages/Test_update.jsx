import React from 'react'

function Test_update() {
    const test =[
        {id:1,name:'Tan'},
        {id:2,name:'Thanh'},
        {id:3,name:'hieu'}
    ]
    const oi={id:2,name:'duoc'}
     
    const i = test.findIndex(x => x.id === oi.id)
    // const ty = test.map(t=>{
        test[i]=oi
    // })
    


    console.log('i',i)

    console.log('i',i)
      
    console.log('oi',oi)

    console.log('test',test)
  return (
    <div>
      Test_update
    </div>
  )
}

export default Test_update
