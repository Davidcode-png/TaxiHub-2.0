import {React,useState} from 'react';
import {Box,Drawer,List,ListItem,ListItemButton,ListItemText} from '@mui/material';
import '../Assets/custom.css'

const Navbar = () => {
const [openMenu,setOpenMenu] = useState(false)
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
                        <button className = "whiteLink siteLink drawer-button"  onClick={() => setOpenMenu(true)}><i class="bi bi-list"></i> MENU</button>
                        </div>
                        <div className="flex3 text-center" id="siteBrand">
                            TAXI HUB
                        </div>
                    <div class="flex2 text-end d-none d-md-block">
                        <button class="whiteLink siteLink">REGISTER</button>
                        <button class="blackLink siteLink">Login</button>
                    </div>
                </div>
            </div>
            <Drawer open={openMenu} onClose={()=>setOpenMenu(false)} anchor='left'>
                <Box sx={{width:250,
                        height:400,
                        '&:hover':{
                            backgroundColor:'primary.main'
                        },
                        backgroundColor:'primary.dark'}} role="presentation"
                        onClick={()=>setOpenMenu(false)}
                        onKeyDown={()=>setOpenMenu(false)}>
                    <h1>Testing</h1>
                    <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText>new</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText>new</ListItemText>
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