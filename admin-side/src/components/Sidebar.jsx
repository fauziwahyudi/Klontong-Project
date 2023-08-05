import LogoKlontongMart from '../assets/klontong-mart.png'
import Dashboard from '../assets/Dasboard.svg'
import Categories from '../assets/categories.svg'
import Register from '../assets/register.svg'
import SignOut from '../assets/logout.svg'
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Sidebar() {

    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const henddleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('access_token')
        navigate('/login')

        const Toast = MySwal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', MySwal.stopTimer)
                toast.addEventListener('mouseleave', MySwal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Successfully Sign Out'
        })
    }
    return (
        <>
                <div className="sidebar">
                    <div className="header">
                        <div className="list-item">
                            <a href="#">
                                <img src="" alt="" className="icon"/>
                                    <span className="description-header" style={{marginLeft: "25px"}}>Admin Panel</span>
                            </a>
                        </div>
                        {/* <div className="illustration">
                            <img style={{ width: "100px", marginLeft: "5px", marginBottom: "30px" }} src={LogoKlontongMart} alt=""/>
                        </div> */}
                    </div>

                    <div className="main">
                        <div className="list-item">
                            <Link to={'/'}>
                                <img src={Dashboard} alt="" className="icon"/>
                                    <span className="description">Dashboard</span>
                            </Link>
                        </div>
                        <div className="list-item">
                            <Link to={'/categories'}>
                                <img src={Categories} alt="" className="icon"/>
                                    <span className="description">Categories</span>
                            </Link>
                        </div>
                        <div className="list-item">
                            <Link to={'/register'}>
                                <img src={Register} alt="" className="icon"/>
                                    <span className="description">Register Admin</span>
                            </Link>
                        </div>
                        <div className="list-item">
                            <Link onClick={henddleLogout} >
                                <img src={SignOut} alt="" className="icon"/>
                                    <span className="description">Sign Out</span>
                            </Link>
                        </div>
                    </div>

                </div>
        
        </>
    )
}