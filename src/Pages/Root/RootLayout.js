import { Outlet } from 'react-router-dom';
import NavBar from '../../component/NavBar/navbar';
import { useContext } from 'react';
import UserContext from '../../context/user-context';
import { checkAuth } from '../../utils/auth';
function RootLayout() {
  const userctx = useContext(UserContext);
  const links = {
    patient: [
      {
        to: '/',
        title: (
          <h1>
            <span>home</span>
          </h1>
        ),
        icon: (
          <h1>
            <i class='fa-solid fa-house'></i>
          </h1>
        ),
      },
      {
        to: '/appointment',
        title: (
          <h1>
            <span>appointment</span>
          </h1>
        ),
        icon: (
          <h1>
            <i class='fa-solid fa-phone'></i>
          </h1>
        ),
      },
    ],
    doctor: [
      {
        to: '/appointment',
        title: (
          <h1>
            <span>appointment</span>
          </h1>
        ),
        icon: (
          <h1>
            <i class='fa-solid fa-phone'></i>
          </h1>
        ),
      },
    ],
    admin: [
      {
        to: '/',
        title: (
          <h1>
            <span>home</span>
          </h1>
        ),
        icon: (
          <h1>
            <i class='fa-solid fa-house'></i>
          </h1>
        ),
      },
    ],
    receptionist: [
      {
        to: '/appointment',
        title: (
          <h1>
            <span>appointment</span>
          </h1>
        ),
        icon: (
          <h1>
            <i class='fa-solid fa-phone'></i>
          </h1>
        ),
      },
    ],
    lab: [
      {
        to: '/',
        title: (
          <h1>
            <span>home</span>
          </h1>
        ),
        icon: (
          <h1>
            <i class='fa-solid fa-house'></i>
          </h1>
        ),
      },
    ],
    radiologist: [
      {
        to: '/',
        title: (
          <h1>
            <span>home</span>
          </h1>
        ),
        icon: (
          <h1>
            <i class='fa-solid fa-house'></i>
          </h1>
        ),
      },
    ],
  };
  return (
    <>
      {checkAuth() && (
        <NavBar
          links={links[userctx.role]}
          id='nav'
          firstname={userctx.PersonalInformation.FirstName}
          role={userctx.role}
        />
      )}
      <div
        style={{
          height: checkAuth() ? '90vh' : '100vh',
          display: 'flex',
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
export default RootLayout;