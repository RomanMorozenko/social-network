import { Link } from 'react-router-dom'
import { Error } from '../../assets/images/Error'
import { Button } from 'antd'
import s from './errorPage.module.scss'

export const ErrorPage = () => {
    return (
        <div className={s.errorContainer}>
            <Error />
            <p>Sorry this page can not be found.</p>
            <Button style={{ backgroundColor: '#001529' }} type="primary">
                <Link to="/profile">Back to profile page</Link>
            </Button>
        </div>
    )
}
