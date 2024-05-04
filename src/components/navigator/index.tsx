import React, {useState, useId} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';

import {
  ButtonDrawerContainer,
  ButtonMenu,
  CustomDrawer,
  DrawerContent,
  Navigation,
  NavigationContainer,
  NavigationMenu,
  NavigationMenuItem,
  UserWrapper,
  Wrapper,
} from './styles';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../modules/authentication/use-auth';
import {ArrowLeft, ArrowRight} from '@mui/icons-material';
import {uniqueId} from 'lodash';
import { GradientIcon } from '../gradient-icon';
export interface IRoutes {
  id: string;
  name: string;
  control?: boolean;
  routes?: IRoutes[];
  hasChildren?: boolean;
  // onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  path?: string[];
}
interface IMenuRoutes {
  id: string;
  name: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  routes: IRoutes[];
}

export const Navigator: React.FC = () => {
  const {signOut} = useAuth();

  const location = useLocation();

  const [anchorElRegister, setAnchorElRegister] = useState<null | HTMLElement>(
    null,
  );

  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const openRegister = Boolean(anchorElRegister);
  const handleClickRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElRegister(event.currentTarget);
  };

  const handleCloseRegister = () => {
    setAnchorElRegister(null);
  };

  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null,
  );

  const openProfile = Boolean(anchorElProfile);
  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleViewProfile = () => {
    navigate(`/profile`, {
      relative: 'route',
    });
  };

  const handleResetPassword = () => {
    navigate(`/reset-password`, {
      relative: 'route',
    });
  };

  const handleNavigationDashboard = (
    _: React.MouseEvent<HTMLButtonElement>,
  ) => {
    navigate('/dashboard');
  };

  const routes: IRoutes[] = [
    {
      id: '363211361991038903',
      name: 'Dashboard',
      control: openRegister,
      onClick: handleNavigationDashboard,
      hasChildren: false,
      path: ['dashboard'],
    },
    {
      id: '939239130823',
      name: 'Cadastros',
      control: openRegister,
      onClick: handleClickRegister,
      hasChildren: true,
      path: ['register', 'list', 'network'],
    },
  ];

  const menuRoutes: IMenuRoutes[] = [
    {
      id: useId(),
      name: 'register',
      anchorEl: anchorElRegister,
      open: openRegister,
      onClose: handleCloseRegister,
      routes: [
        {
          id: '12432137892',
          name: 'Usuários',
          onClick: () => navigate('user-list'),
        },
      ],
    },
    {
      id: useId(),
      name: 'profile',
      anchorEl: anchorElProfile,
      open: openProfile,
      onClose: handleCloseProfile,
      routes: [
        {
          id: useId(),
          name: 'Perfil',
          onClick: () => handleViewProfile(),
        },
        {
          id: useId(),
          name: 'Redefinir senha',
          onClick: () => handleResetPassword(),
        },
        {
          id: useId(),
          name: 'Sair',
          onClick: () => signOut(),
        },
      ],
    },
  ];

  const handleIsActive = (path: string, routePaths: string[]) => {
    let isActive = false;
    for (const key of routePaths) {
      if (path.includes(key)) {
        isActive = true;
        break;
      }
    }
    return isActive;
  };

  return (
    <NavigationContainer>
      <Wrapper>
        <Navigation>
          {routes.map(ele => (
            <ButtonMenu
              key={ele.id}
              id={ele.id}
              aria-controls={ele.control ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={ele.control ? 'true' : undefined}
              isActive={handleIsActive(location.pathname, ele.path)}
              onClick={ele.onClick}>
              {ele.name}
              {ele.hasChildren && (
                <KeyboardArrowDownIcon
                  sx={{
                    width: 24,
                    height: 24,
                    fill: '#000!important',
                    marginLeft: '1.6rem',
                  }}
                />
              )}
            </ButtonMenu>
          ))}
        </Navigation>
        {menuRoutes.map(ele => (
          <NavigationMenu
            key={ele.id}
            id={ele.id}
            anchorEl={ele.anchorEl}
            open={ele.open}
            onClose={ele.onClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            {ele.routes.map((item, key) => (
              <div key={key}>
                <NavigationMenuItem
                  key={ele.id}
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={() => {
                    item.onClick();
                    if (!item.routes) ele.onClose();
                  }}>
                  {item.name}
                  {item.routes && (
                    <>
                      {open ? <ArrowLeft /> : <ArrowRight />}
                    </>
                  )}
                </NavigationMenuItem>
              </div>
            ))}
          </NavigationMenu>
        ))}
      </Wrapper>
      <UserWrapper>
        <ButtonMenu
          aria-controls={openProfile ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openProfile ? 'true' : undefined}
          onClick={handleClickProfile}>
          <GradientIcon
            height={30}
            width={30}
            icon={
              <AccountCircleIcon
                sx={{
                  fill: 'url(#myGradient)',
                  height: '2rem',
                  width: '2rem',
                }}
              />
            }
          />
        </ButtonMenu>
        <ButtonDrawerContainer>
          <ButtonMenu onClick={() => setOpenDrawer(true)}>
            <GradientIcon
              height={40}
              width={40}
              icon={
                <MenuIcon
                  sx={{
                    height: '2rem',
                    width: '2rem',
                    fill: 'url(#myGradient)',
                  }}
                />
              }
            />
          </ButtonMenu>
        </ButtonDrawerContainer>
      </UserWrapper>
      <CustomDrawer
        anchor={'right'}
        open={openDrawer}
        keepMounted
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}>
        <DrawerContent>
          {routes.map(ele => (
            <ButtonMenu
              key={ele.id}
              id={ele.id}
              aria-controls={ele.control ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={ele.control ? 'true' : undefined}
              onClick={ele.onClick}>
              {ele.name}
              <KeyboardArrowDownIcon
                sx={{
                  width: 24,
                  height: 24,
                  fill: '#000!important',
                  marginLeft: '1.6rem',
                }}
              />
            </ButtonMenu>
          ))}
        </DrawerContent>
      </CustomDrawer>
    </NavigationContainer>
  );
};
