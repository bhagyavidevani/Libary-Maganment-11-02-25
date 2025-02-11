import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleBookAsync } from '../Services/Action/Bookaction';
import Header from './Header';
import { Container } from 'react-bootstrap';

const SingalPage = () => {
  const { id } = useParams(); // Get the book ID from the URL params
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.BookReduces); // Get the selected book from the Redux state

  // Dispatch the action to fetch the single book's data
  useEffect(() => {
    if (id) {
      dispatch(singleBookAsync(id));
    }
  }, [id, dispatch]);

  return (
    <div>
      <Header />
      <div className="singleBook pt-5">
        {book ? (
          <Container>
            <div className="book-details text-white ">
            <h2 className='text-center fw-bold pb-2' style={{color:'#f2d4bc'}}>{book.title}</h2>
            <div className='book-image'>
              <img src={book.imageUrl} alt={book.title} width={400} height={400} className='rounded'/>
            </div>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Author:</strong> {book.author}</p>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Category:</strong> {book.category}</p>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Date:</strong> {book.date}</p>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Price:</strong> ${book.price}</p>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Pages:</strong> {book.page}</p>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Description:</strong> {book.description}</p>
          </div>
          </Container>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SingalPage;
