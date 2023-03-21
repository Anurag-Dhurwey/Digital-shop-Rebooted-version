export const navReducer=(state,action)=>{
    switch (action.type) {
        case 'setCurrent':
            const newNav=state.map((currItm)=>{
                if(action.payload.name===currItm.name){
                return  {...currItm,current:true}
                }else{
                  return {...currItm,current:false}
                }   
             })
            return newNav;
        case 'offNavEffect':
            const newNav2=state.map((currItm)=>{
               return {
                ...currItm,current:false
               }
             })
           
            return newNav2
            
    
        default:
            return state;
    }
}