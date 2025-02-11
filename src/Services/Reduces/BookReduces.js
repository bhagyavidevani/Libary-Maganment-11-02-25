
const initialState={
  books:JSON.parse(localStorage.getItem("books")) || [],
  book:null,
  isCreated:false,
  error:null,
  isUpdated:false
}


export const BookReduces =( state=initialState, action)=>{
   switch (action.type) {
    case "ADD_NEW_BOOK":
        return{
            ...state,
            isCreated: true
        }
    case "GET_ALL_BOOKS":
      return{
        ...state,
        books:action.payload,
        isCreated:false,
        isUpdated: false
      }
    case "ADD_NEW_BOOK_REJ": 
    return {
        ...state,
        error: action.payload
    }  
    case "UPDATE_BOOK":
      return{
        ...state,
        isUpdated:true,
        book:null
      }
    case "SINGLE_BOOK":
      return{
        ...state,
        book:action.payload
      }
    default:
      return state;
   }
}
