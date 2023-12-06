import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { Avatar } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { useNavigate } from 'react-router-dom';


function CollaborateurList(props) {
    const { collaborateur } = props;
    // console.log(collaborateur)

    const container = {
        show: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };


    if (collaborateur.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    Aucun collaborateur a été enregistré dans la base de donnée!
                </Typography>
            </motion.div>
        );
    }

   const navigate = useNavigate();
   const handleClick = (item) => {
        navigate(`collaborateurs/all/${item.id}`)
   }
    


    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 w-full min-w-0"
        >
            {collaborateur && collaborateur.map((collab) => (
                <Paper
                    component={motion.div}
                    variants={item}
                    className="flex flex-col flex-auto items-center shadow rounded-2xl overflow-hidden"
                    key={collab.id}
                   
                >
                    <div className="flex flex-col flex-auto w-full p-32 text-center pointer" >
                        <div className="w-128 h-128 mx-auto rounded-full overflow-hidden">
                            {collab.Collab?.image ? (
                                <Avatar
                                    sx={{
                                        backgroundColor: 'background.paper',
                                        color: 'text.secondary',
                                    }}
                                    className="avatar text-32 font-bold w-96 h-96" alt="user photo" src={`http://localhost:4000/${collab.Collab?.image}`} />
                            ) : (
                                <Avatar sx={{
                                    backgroundColor: 'background.paper',
                                    color: 'text.secondary',
                                }}
                                    className="avatar text-32 font-bold w-96 h-96">{collab.Collab?.nom ? collab.Collab?.nom[0] : '?'}</Avatar>
                            )}
                        </div>
                        <Typography className="mt-24 font-medium">{collab.Collab?.nom} {collab.Collab?.prenom}</Typography>
                        <Typography color="text.secondary">{collab.Collab?.poste1?.titrePoste}</Typography>
                    </div>
                    <div className="flex items-center w-full border-t divide-x">
                        <a
                            className="flex flex-auto items-center justify-center py-16 hover:bg-hover"
                            href={`mailto:${collab.email}`}
                            role="button"
                        >
                            <FuseSvgIcon size={20} color="action">
                                heroicons-solid:mail
                            </FuseSvgIcon>
                            <Typography className="ml-8">Email</Typography>
                        </a>
                        {/* <a
                            className="flex flex-auto items-center justify-center py-16 hover:bg-hover"
                            // href={`tel${member.phone}`}
                            role="button"
                        >
                            <FuseSvgIcon size={20} color="action">
                                heroicons-solid:phone
                            </FuseSvgIcon>
                            <Typography className="ml-8">Message</Typography>
                        </a> */}
                    </div>
                </Paper>
            ))}
        </motion.div>
    )
}

export default CollaborateurList
