import { Outlet, Link } from "react-router-dom"
import Title from "../components/Title"
import LinkTab from "../components/LinkTab"
const Layout = () => {
    return (
        <div className="flex flex-column">
            <Link className="center-horizontal margin-top margin-bottom hover-expand" to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                <Title/>
            </Link>
            <Outlet />
        </div>
    )
}

export default Layout