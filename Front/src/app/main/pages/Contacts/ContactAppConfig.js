import {lazy} from 'react'; 
import ContactView from './ContactView';

const ContactApp = lazy(() => import('./ContactApp'))

const ContactAppConfig = {
    settings: {
        layout: {
          config: {},
        },
    },
    routes : [
        {
            path : 'collaborateurs/all',
            element : <ContactApp/>,
            children : [
                {
                    path: ':id',
                    element : <ContactView/>
                }
            ]
        }
    ]
}

export default ContactAppConfig;