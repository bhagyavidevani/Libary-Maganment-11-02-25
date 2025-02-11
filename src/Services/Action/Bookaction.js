import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export const addNewBook=()=>{
   return{
    type:"ADD_NEW_BOOK"
   }
}

export const addBookRej = (msg) => {
    return {
        type: "ADD_NEW_BOOK_REJ",
        payload: msg
    }
}

export const getAllBooks=(data)=>{
    return{
        type:'GET_ALL_BOOKS',
        payload:data
    }
}

export const updateBook=()=>{
    return{
        type:'UPDATE_BOOK'
    }
}

export const singleBook=(data)=>{
    return{
        type:"SINGLE_BOOK",
        payload:data
    }
}
export const addBookAsync =(data)=>{
  return async(dispatch)=>{
      try{
          await setDoc(doc(db,'books',`${data.id}`),data)
          console.log('Book added successfully');
          dispatch(addNewBook())
      }
      catch(err){
          console.log(err)
      }
  }
}

export const getAllBooksAsync=()=>{
    return async(dispatch)=>{
        try {
            let books=await getDocs(collection(db,"books"))
            let result=books.docs.map((book)=>{
                return{
                    id:book.id,
                    ...book.data()
                }
            })
            dispatch(getAllBooks(result))
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteBookAsync=(id)=>{
   return async(dispatch)=>{
    try {
        await deleteDoc(doc(db,"books",`${id}`))
        dispatch(getAllBooksAsync())
    } catch (error) {
        console.log(error)
    }
   }
}


export const updateBookAsync=(data)=>{
   return async(dispatch)=>{
      try {
         await updateDoc(doc(db,"books",`${data.id}`),data)
         dispatch(updateBook())
      } catch (error) {
        console.log(error)
      }
   }
}

export const singleBookAsync=(id)=>{
    return async(dispatch)=>{
       try {
        let res=await getDoc(doc(db,'books',`${id}`))
        let result=res.data();
        result.id=res.id;
        dispatch(singleBook(result))
        
       } catch (error) {
        console.log(error)
       }
    }
}

