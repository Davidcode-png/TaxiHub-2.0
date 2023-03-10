import {React,useState} from 'react';
import {Box,Drawer,List,ListItem,ListItemButton,ListItemText} from '@mui/material';


const Navbar = () => {
const [openMenu,setOpenMenu] = useState(false)
return(
    <nav>
        <div className="nav-logo-container">

            <button onClick={() => setOpenMenu(true)}>Click Here</button>
            <Drawer open={openMenu} onClose={()=>setOpenMenu(false)} anchor='right'>
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