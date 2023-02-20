
import { Box } from '@mui/material';
import {  useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const navigate = useNavigate()

    function goHome() {
        navigate('/');
    }
    return (
        <>
        <Box className="header" onClick={goHome}>
            Recipe Repo
        </Box>

        <Box className="non-header">
           
            <Box component="main" sx={{ p: { xs: 2, sm: 3 } }} className="main-section">

                {children}
            </Box>
        </Box>
        </>
    );
}; 

export default MainLayout;
