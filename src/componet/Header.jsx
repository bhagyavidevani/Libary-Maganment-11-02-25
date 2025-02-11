import { Navbar,Container, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOutAsync } from "../Services/Action/Authaction";

function Header(background) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} =useSelector(state => state.AuthReduces)
  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogOut = () => {
    dispatch(logOutAsync())
  }
  return (
      <>
         <div className="mainNavbar">
              <div className="header" style={{ backgroundColor: background }}>
                  <Container>
                    <Navbar className="justify-content-between w-100 align-items-center p-0" expand="lg">
                      <Navbar.Brand href="/" className="fs-1 fw-bold">Library</Navbar.Brand>
                      <nav >
                        <ul className="d-flex justify-content-center m-0">
                          <li><a href="/" className="p-0 fw-semibold fs-5">Home</a></li>


                          <li className="ps-5">
                            <div className="nav-item">
                              <div className="category-hover d-flex align-items-center">
                              <a href="/AddBook" className="fs-5 fw-semibold ">
                                AddBook
                              </a>
                              </div>
                            </div>
                          </li>
                          
                        </ul>
                      </nav>
                      <div className="btn">
                      {!user ? <button onClick={handleLogin} className="">Login</button> : <button onClick={handleLogOut}>LogOut</button>}
                      </div>
                    </Navbar>
                 </Container>
              </div>
          </div>
          
      </>
  )
}

export default Header
