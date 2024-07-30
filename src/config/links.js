import { TiHome } from 'react-icons/ti';
import { MdOutlinePets } from 'react-icons/md';

import Dashboard from '../pages/Dashboard';
import Pets from '../pages/Pets';


const links = [
  { path: '/', name: 'Dashboard', icon: TiHome, component: Dashboard },
  { path: '/pets', name: 'Pets', icon: MdOutlinePets, component: Pets },
];

export default links;