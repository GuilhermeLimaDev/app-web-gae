import { Route, Routes } from 'react-router-dom'
import Homepage from '../homepage/Homepage'
import Reports from '../reports/Reports'
import ProblemDetails from '../problemdetails/ProblemDetails'
import SidebarLayout from '../../components/layout/SidebarLayout'

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<SidebarLayout/>}>
                <Route path='/homepage' element={<Homepage/>}/>
                <Route path='/reports' element={<Reports/>}/>
            </Route>

            <Route path='/details' element={<ProblemDetails/>}/>
        </Routes>
    )
}

export default AppRoutes