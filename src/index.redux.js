
const ADD_GUN = '加';
const REMOVE_GUN = '减';
// 1.新建store
/**
 * 通过reducer建立
 * 根据老的state和action生成新状态
 */
export function counter(state=0, action){
    switch(action.type){
      case ADD_GUN:
        return state+1;
      case REMOVE_GUN:
        return state-1;
      default:
        return 10;
    }
  }

  export function addGUN(){
      return ({type:ADD_GUN})
  }
  export function addGUNAsync(){
      return (
        dispatch=>{
          setTimeout(() => { 
            dispatch({type:ADD_GUN})
          }, 2000);
        }
      )
  }
  export function removeGUN(){
      return ({type:REMOVE_GUN})
  }