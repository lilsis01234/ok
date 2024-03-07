import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button, ListItemText, Menu, MenuItem } from '@mui/material';
import React from 'react'


const viewNamesObj = {
  dayGridMonth: {
    title: 'Mois',
    icon: 'view_module',
  },
  timeGridWeek: {
    title: 'Semaine',
    icon: 'view_week',
  },
  timeGridDay: {
    title: 'Jour',
    icon: 'view_agenda',
  },
};


function AgendaViewMenu(props) {
  const { className, calendarApi, currentDate } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div className={className}>
      <Button
        sx={{ minWidth: 120 }}
        className="rounded-6 justify-between"
        id="view-select-button"
        aria-controls="view-select-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        endIcon={<FuseSvgIcon size={16}>heroicons-outline:chevron-down</FuseSvgIcon>}
      >
        {viewNamesObj[currentDate?.view.type]?.title}
      </Button>
      <Menu
        id="view-select-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'view-select-button',
        }}
      >
        {Object.entries(viewNamesObj).map(([name, view]) => (
          <MenuItem
            key={name}
            onClick={() => {
              calendarApi().changeView(name);
              handleClose();
            }}
          >
            <ListItemText primary={view.title} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default AgendaViewMenu
