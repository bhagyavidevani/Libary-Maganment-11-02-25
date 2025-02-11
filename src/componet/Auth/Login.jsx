import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
// import logo from '../Auth/img/logo.png';
// import logo2 from '../Auth/img/logo2.png';
// import logo3 from '../Auth/img/logo3.png';
import logo4 from '../Auth/img/logo4.png'
import { useDispatch, useSelector} from 'react-redux';
import { addNewUserAsync, loginUserAsync } from '../../Services/Action/Authaction';
import { useNavigate } from 'react-router';

// import { useNavigate } from 'react-router';

function Login() {
  const dispatch =useDispatch();
  const navigate =useNavigate();
  const {user } =useSelector(state => state.AuthReduces)
  // console.log(user)
  const [isSignUp, setIsSignUp] = useState({
    email:'',
    password:'',
    conpassword:''
  });
  const [isSignIn,setIsSignIn] =useState({
    Email:"",
    Password:""
  })

  const handelChanged=(e)=>{
    const {name,value} =e.target;
    setIsSignUp({
      ...isSignUp,
      [name]:value,
    })
    setIsSignIn({
      ...isSignIn,
      [name]:value,
    })
  }

  const handelSubmit=(e)=>{
    e.preventDefault();
    // console.log(setIsSignUp)
    if(isSignUp.password === isSignUp.conpassword){
      dispatch(addNewUserAsync(isSignUp))
    }
    else{
      alert("Password & confirm Password does not matched !")
    }
  }
  
  const handelSubmited=(e)=>{
    e.preventDefault();
    // console.log(setIsSignIn)
    dispatch(loginUserAsync(isSignIn))

  }

//   useEffect(() => {
//     if(isCreated){
//         navigate("/login")
//     }else{
//       navigate("/login")
//     }
// }, [isCreated])
  
  useEffect(() => {
    if(user){
        navigate("/")
    }else{
      navigate("/login")
    }
}, [user]);

  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const signUpLink = document.querySelector('.signUp-link');
    const signInLink = document.querySelector('.signIn-link');

    signUpLink.addEventListener('click', () => {
      wrapper.classList.add('animate-signIn');
      wrapper.classList.remove('animate-signUp');
    });

    signInLink.addEventListener('click', () => {
      wrapper.classList.add('animate-signUp');
      wrapper.classList.remove('animate-signIn');
    });

    // Cleanup event listeners when component unmounts
    return () => {
      signUpLink.removeEventListener('click', () => {
        wrapper.classList.add('animate-signIn');
        wrapper.classList.remove('animate-signUp');
      });
      signInLink.removeEventListener('click', () => {
        wrapper.classList.add('animate-signUp');
        wrapper.classList.remove('animate-signIn');
      });
    };
  }, []);

  return (
    <>
      <div className="sign">
        <div className="wrapper">
          <div className="form-wrapper sign-up">
          {/* {error ? <p>{error}</p> : ""} */}
            <Form onSubmit={handelSubmit}>
              <h1 className="d-flex justify-content-between align-items-center">
                <img src={logo4} alt="logo" width={"180px"} />
                <p className="fs-1 fw-bold" style={{color:''}}>
                  Library <br />
                  <span className="fs-5 fw-normal">Management System</span>
                </p>
              </h1>
              <h2>SignUp Form</h2>
              <div className="input-group">
                <input type="email" required name='email' value={isSignUp.email} onChange={handelChanged}/>
                <label>Email</label>
              </div>
              <div className="input-group">
                <input type="password" required name='password' value={isSignUp.password} onChange={handelChanged}/>
                <label>password</label>
              </div>
              <div className="input-group">
                <input type="password" required name='conpassword' value={isSignUp.conpassword} onChange={handelChanged}/>
                <label>Confirm Password</label>
              </div>
              <button type="submit" className="btn">Sign Up</button>
              <div className="sign-link">
                <p>
                  Already have an account?{' '}
                  <a href="javascript:void(0)" className="signIn-link">Sign In</a>
                </p>
              </div>
            </Form>
          </div>
          <div className="form-wrapper sign-in">
            <Form onSubmit={handelSubmited}>
              <h1 className="d-flex justify-content-between align-items-center">
                <img src={logo4} alt="logo" width={"180px"} />
                <p className="fs-1 fw-bold">
                  Library <br />
                  <span className="fs-5 fw-normal">Management System</span>
                </p>
              </h1>
              <h2>Login Form</h2>
              <div className="input-group">
                <input type="text" name='Email'required value={isSignIn.Email} onChange={handelChanged}/>
                <label>Email</label>
              </div>
              <div className="input-group">
                <input type="password" name='Password' required value={isSignIn.Password} onChange={handelChanged}/>
                <label>Password</label>
              </div>
              <div className="forgot-pass">
                <a href="#">Google Login?</a>
              </div>
              <button type="submit" className="btn">Login</button>
              <div className="sign-link">
                <p>
                  Do not have an account?{' '}
                  <a href="javascript:void(0)" className="signUp-link">Sign Up</a>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
