// import React from 'react'

import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap"
import generateUniqueId  from "generate-unique-id";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addBookAsync } from "../Services/Action/Bookaction";
import Header from "./Header";


function AddBook() {
  const{error,isCreated} =useSelector((state)=>state.BookReduces)
  const dispatch =useDispatch();
  const navigate =useNavigate()
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [bookinput, setbookInput] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    date:"",
    page:"",
    author:""
  });

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };


  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
        if (!value) error = "* Title is required";
        break;
        case "date":
        if (!value) error = "* Date is required";
        break;
        case "author":
        if (!value) error = "* author is required";
        break;
        case "page":
        if (!value) error = "* page is required";
        break;
      case "price":
        if (!value) {
          error = "* Price is required";
        } else if (isNaN(value)) {
          error = "* Price must be a valid number";
        } else if (parseFloat(value) <= 0) {
          error = "* Price must be greater than zero";
        }
         
        break;
      case "category":
        if (!value) error = "*category  is required";
        break;
      case "description":
        if (!value) {
          error = "* Description is required";
        } else if (value.length < 20) {
          error = "* Description must be at least 20 characters long";
        }
        break;
        case "img":
          if (!value) error = "* Image URL is required";
          break;
      default:
        break;
    }
    return error;
  };


  const handelChanged = (e) => {
    const { name, value } = e.target;
    setbookInput({
      ...bookinput,
      [name]: value,
    });
  };


  const handelSubmit = (e) => {
    e.preventDefault();
    // console.log("Submit now", productinput);
    const newErrors = {};
    Object.keys(bookinput).forEach((field) => {
      const error = validateField(field, bookinput[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    const imgError = validateField('img', imageUrl);
    if (imgError) {
      newErrors.img = imgError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    let id = generateUniqueId({
      length: 5,
      useLetters: false,
    });
    console.log("Submitting product:", { ...bookinput, id, imageUrl }); 
    dispatch(addBookAsync({ ...bookinput, id,imageUrl }));
  };

  useEffect(()=> {
    if(isCreated){
      navigate("/")
      // console.log(isCreated)
    }
  }, [isCreated, navigate])

  
  return (
    <div>
      <Header/>
      {error ? <p>{error}</p> : ""}
       <div className="addbook">
          <Container>
             <Form 
             onSubmit={handelSubmit}
             >
             <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="3" style={{color:'#fff'}}>
                  Book Title :-
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter Book Title"
                    name="title"
                    value={bookinput.title}
                    onChange={handelChanged}
                    width={"50px"}
                    />
                </Col>
                    {errors.title && <i style={{ color: "red" }}>{errors.title}</i>}
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm="3" style={{ color: '#fff' }}>
                Book Date:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="date" // Ensure this is lowercase
                  name="date"
                  value={bookinput.date}
                  onChange={handelChanged}
                />
              </Col>
              {errors.date && <i style={{ color: "red" }}>{errors.date}</i>}
            </Form.Group>
             
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm="3" style={{ color: '#fff' }}>
                Book Page :-
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="number"
                  placeholder="Enter Book Pages"
                  name="page" // Change name to "page"
                  value={bookinput.page} // Make sure to bind it with the correct state
                  onChange={handelChanged}
                />
              </Col>
              {errors.page && <i style={{ color: "red" }}>{errors.page}</i>} {/* Error for page */}
            </Form.Group>


            <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="3" style={{color:'#fff'}}>
                  Book Author :-
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter Book Author"
                    name="author"
                    value={bookinput.author}
                    onChange={handelChanged}
                    width={"50px"}
                    />
                </Col>
                    {errors.author && <i style={{ color: "red" }}>{errors.author}</i>}
            </Form.Group>

            <Form.Group as={Row} className="mb-4 d-flex justify-content-center align-items-center">
              <Form.Label column sm="3" style={{color:'#fff'}}>
                Book Description :-
              </Form.Label>
              <Col sm="9">
              <Form.Control
                      as="textarea"
                      name="description"
                      rows="5"
                      placeholder="Write your description here..."
                      className="mb-3"
                      // spellCheck="true"
                      value={bookinput.description}
                      onChange={handelChanged}
                    />
              </Col>
              {errors.description && <i style={{ color: "red" }}>{errors.description}</i>}
            </Form.Group>

            <Form.Group as={Row} className="mb-4 d-flex justify-content-center align-items-center">
            <Form.Label column sm="3" style={{color:'#fff'}}>
              Book Category :-
            </Form.Label>
            <Col sm="9">
                <Form.Select
                  aria-label="Category"
                  className="border-bottom border-0"
                  onChange={handelChanged}
                  name="category"
                  // onBlur={() => setErrors({ ...errors, priority: validateField("priority", noteInput.priority) })}
                >
                  <option>Select Category</option>
                  <option value="romance">Romance Novel</option>
                  <option value="horror">Horror</option>
                  <option value="mystery">Mystery</option>
                  <option value="thriller">Thriller</option>
                  <option value="science">Science fiction</option>
                  <option value="historical">Historical</option>
                </Form.Select>
            </Col>
            {errors.category && <i style={{ color: "red" }}>{errors.category}</i>}
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="3" style={{color:'#fff'}}>
              Book Price :-
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                placeholder="Enter Book Price"
                name="price"
                value={bookinput.price}
                onChange={handelChanged}
                width={"50px"}
              />
            </Col>
            {errors.price && <i style={{ color: "red" }}>{errors.price}</i>}
            </Form.Group>

            <Form.Group as={Row} className="mb-4 d-flex justify-content-center align-items-center">
              <Form.Label column sm="3" style={{color:'#fff'}}>
                ImageUrl :-
              </Form.Label>
              <Col sm="9">
              <Form.Control
                      type="url"
                      name='img'
                      placeholder="Paste an image URL"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                    />
              </Col>
            {errors.img && <i style={{ color: "red" }}>{errors.img}</i>}
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={12} className="d-flex justify-content-center">
              <button type="submit" className='text-center'>Add Product</button>
            </Col>
          </Form.Group>
            </Form>
          </Container>
       </div>
    </div>
  )
}

export default AddBook
