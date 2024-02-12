import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const Toast = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    )
}
