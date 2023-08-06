import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import styled from 'styled-components';

const Layout = () => {
  return (
    <Container>
      <Sidebar />
        <Outlet />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 100vw;
`;