import { TiHome } from 'react-icons/ti';
import { MdOutlinePets } from 'react-icons/md';

import Dashboard from '../pages/Dashboard';
import Pets from '../pages/Pets';
import PetDetails from '../pages/PetDetails';


const links = [
  { path: '/', name: 'Dashboard', icon: TiHome, component: <Dashboard/>, sidenav: true },
  { path: '/pets', name: 'Pets', icon: MdOutlinePets, component: <Pets/>, sidenav: true },
  { path: '/pets/:petId', name: 'Pet Details', icon: MdOutlinePets, component: <PetDetails />, sidenav:false },
];

export default links