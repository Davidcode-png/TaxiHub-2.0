import {React,useState} from 'react';
import {Box,Drawer,List,ListItem,ListItemButton,ListItemText,ListItemIcon} from '@mui/material';
import '../Assets/custom.css'


const Navbar = () => {

const [openMenu,setOpenMenu] = useState(false)
// const [openLanguageMenu,setOpenLanguageMenu] = useState(false)
return(

    <nav>
        
        <div className="p-3 bg-dark text-white">
            <div className="flexMain">
                <div className="flex1">
                    
                </div>
                <div className="flex2 text-center">
                    <div><strong>Awesome App, Try it Out</strong></div>
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
                    <div class="flex2 text-end d-md-block d-flex flex-row">
                        <button class="whiteLink siteLink button-width" >REGISTER</button>
                        <button class="blackLink siteLink button-width">LOGIN</button>
                    </div>
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
                        {/* <ListItem>
                        <div className="p-5">
                            <div className='row'>
                                <div className="col">
                                <select className="noStyle">
                                    <option value="english">English</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                    <option value="italian">Italian</option>
                                    <option value="hebrew">Hebrew</option>
                                </select>
                                </div>
                                
                            </div>
                            </div>
                        </ListItem> */}
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon><i class="bi bi-house-door whiteText"></i></ListItemIcon>
                            <ListItemText className='whiteText'>
                            Home
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
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
                    </List>
                </Box>
                
            </Drawer>
        </div>

    </nav>
)
}
export default Navbar;