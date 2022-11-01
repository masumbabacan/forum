import { toast } from 'react-toastify';

const ToastMessage = (message, success) => {
    if (success) {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    } else {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }



}

export default ToastMessage;