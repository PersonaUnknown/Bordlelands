import { Outlet, Link } from "react-router-dom"
import Title from "../components/UI/Title"
const Layout = () => {
    return (
        <div className="flex flex-column">
            <Link className="center-horizontal margin-top margin-bottom hover-expand" to={'https://eric-tabuchi.com/Bordlelands'} style={{ textDecoration: 'none', color: 'black' }}>
                <Title/>
            </Link>
            <Outlet />
        </div>
    )
}

export default Layout