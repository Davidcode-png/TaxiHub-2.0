import {React,useEffect,useState} from 'react';
import {Box,Drawer,List,ListItem,ListItemButton,ListItemText,ListItemIcon,Collapse} from '@mui/material';
import '../Assets/custom.css'
import StarBorder from '@mui/icons-material/StarBorder';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {ExpandLess,ExpandMore} from '@mui/icons-material';
// import InboxIcon from '@mui/icons-material/MoveToInbox';

const Navbar = (props) => {
    const [user, setUser] = useState(null);
    const [logoutMessage,setLogoutMessage] = useState('');
    const [open, setOpen] = useState(true);
    const [isCustomer,setIsCustomer] = useState(false);
    const [isDriver,setIsDriver] = useState(false);

    const config = {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      };

    const handleDrawerClick = () => {
        setOpen(!open);
      };
useEffect(() =>
{
    console.log("The Props Message is :",props.message);
    if(props.message === "Succsfully Logged In"){
        toast.success("Successfully Logged In");
    }
    if(props.message === "Succsfully Registered, Check your email for verification"){
        toast.success(props.message);
    }

},[props.message])



function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("authenticated");
    setLogoutMessage('Successfully Logged Out');
    window.location.reload();
    console.log("This is the logout message ",logoutMessage);
}

useEffect(() =>
{
    const token = localStorage.getItem("token");
    if (token){
        const decodedToken = jwt_decode(token);
        console.log('This is the decoded token: ',decodedToken);
        const user_id = decodedToken.user_id;
        console.log(user_id);
        const response = axios.get(`http://localhost:8000/user/${user_id}`).
        then((response) => {
            const username = response.data.first_name
            setUser(username)
            console.log("Hey dude, this is the response",response)
        })
        .catch((error) =>
            {
                console.log('User is not authenticated')
            }
        )
        const userResponse = axios.get('/profile-exist/',config).
        then((response)=>{
            if(response.status=='200')setIsCustomer(true)
        }).
        catch((error)=>
        {
            console.error(error)
        })

        const driverResponse =  axios.get('/driver-exist/',config).
        then((response)=>{
            if(response.status=='200')setIsDriver(true)
        }).
        catch((error)=>
        {
            console.error(error)
        })
    }
    else{
        console.log("No token");
    }

},[user])

useEffect(()=>{
    
},[isCustomer])


const [openMenu,setOpenMenu] = useState(false)

return(

    <nav>
        <div>
        {(props.message && <ToastContainer />)}
        </div>
        <div className="p-3 bg-dark text-white">
            <div className="flexMain">
                <div className="flex1">
                    
                </div>
                <div className="flex2 text-center">
                    <div><strong>App Still in Development <i class="bi bi-cone-striped"></i></strong></div>
                </div>
                <div className="flex1">

                </div>
            </div>
            </div>
            <div id="menuHolder">
                <div role="navigation" className="sticky-top border-bottom border-top" id="mainNavigation">
                    <div className="flexMain">
                        <div className="flex2">
                        <button className = "whiteLink siteLink drawer-button p-sm-4"  onClick={() => setOpenMenu(true)}>
                            <span className=''>
                            <i class="bi bi-list"></i>
                            </span>
                            <span className='d-none d-lg-inline'>MENU</span>
                             </button>
                        </div>
                        <div className="flex3 text-center" id="siteBrand">
                            TAXI HUB
                        </div>

                    {user && 
                   ( <div className='flex2 text-end d-md-block d-flex flex-row'>
                        <div className=' fs-2 mx-3' id="siteBrand">Welcome {user}</div>
                    </div>)
                    ||(<div className="flex2 text-end d-md-block d-flex flex-row">
                        <a href='#sign_as'>
                        <button className="whiteLink siteLink button-width" >REGISTER</button>
                        </a>
                        <Link to='/login' className='text-decoration-none text-white'>
                        <button className="blackLink siteLink button-width"> LOGIN </button>
                        </Link>
                    </div>)}
                </div>
            </div>
            <Drawer sx={{
                backgroundColor:'text.secondary'
            }}open={openMenu} onClose={()=>setOpenMenu(false)} anchor='left'>
                <Box sx={{width:250,
                        height:'100%',
                        color: 'text.primary',
                        // '&:hover':{
                        //     backgroundColor:'text.secondary'
                        // },
                        backgroundColor:'text.primary'}
                        } role="presentation"
                        // onClick={()=>setOpenMenu(false)}
                        onKeyDown={()=>setOpenMenu(false)}>
                    <h1 className='mx-4 mt-3 whiteText'>Menu</h1>
                    <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon><i class="bi bi-house-door whiteText"></i></ListItemIcon>
                            <ListItemText className='whiteText'>
                            Home
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {user && <ListItem >
                        <Link to='/profile' style={{'text-decoration':'none'}} className='text-white'>

                        <ListItemButton button type="submit">
                            <ListItemIcon><i class="bi bi-person-badge-fill whiteText"></i></ListItemIcon>
                            <ListItemText className='whiteText'>
                                Profile
                            </ListItemText>
                        </ListItemButton>
                        </Link>
                    </ListItem>
                    }
                    {isDriver && <ListItem >
                        <Link to='/dashboard' style={{'text-decoration':'none'}} className='text-white'>

                        <ListItemButton button type="submit">
                            <ListItemIcon><i class="bi bi-person-lines-fill whiteText"></i></ListItemIcon>
                            <ListItemText className='whiteText'>
                                Dashboard
                            </ListItemText>
                        </ListItemButton>
                        </Link>
                    </ListItem>
                    }
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon><i class="bi bi-car-front-fill whiteText"></i></ListItemIcon>
                            <ListItemText className='whiteText'>
                            Ride
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon><i class="bi bi-bus-front-fill whiteText"></i></ListItemIcon>
                            <ListItemText className='whiteText'>
                            Drive
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon><i class="bi bi-person-rolodex whiteText"></i></ListItemIcon>
                            <ListItemText className='whiteText'>About Me</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {user && <ListItem >
                        <ListItemButton button type="submit" onClick={logout}>
                            <ListItemIcon><i class="bi bi-box-arrow-left whiteText"></i></ListItemIcon>
                            <ListItemText className='whiteText'>Logout</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    }

                    


                        
                    </List>
                </Box>
                
            </Drawer>
        </div>

    </nav>
)
}
export default Navbar;