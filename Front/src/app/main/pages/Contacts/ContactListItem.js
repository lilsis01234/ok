import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react'
import NavLinkAdapter from '@fuse/core/NavLinkAdapter/NavLinkAdapter';

function ContactListItem(props) {
    const {collab} = props;
    let id = collab.id;
    return (
        <>
           <ListItem
                className="px-32 py-16"
                sx={{ bgcolor: 'background.paper' }}
                button
                component={NavLinkAdapter}
                to={`/collaborateurs/all/${id}`}
           >
            <ListItemAvatar>
                <Avatar src={`http://localhost:4000/${collab.Collab?.image}`}></Avatar>
            </ListItemAvatar>
            <ListItemText
                  classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                  primary={collab.Collab?.matricule}
                  secondary={
                    <>
                    <Typography  
                        className="inline"
                        component="span"
                        variant="body2"
                        color="text.secondary">
                            {collab.Collab?.nom} {collab.Collab?.prenom}
                    </Typography>
                    </>
                  }
            >
            </ListItemText>

           </ListItem>
        </>
    )

}

export default ContactListItem
