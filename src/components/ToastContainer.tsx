import { ToastContainer as ToastifyToastContainer } from 'react-toastify';
import './ToastContainer.css';
// import 'react-toastify/dist/ReactToastify.css';

import CheckSingle from 'public/icons/check-single.svg';

const ToastContainer = () => {
  return (
    <ToastifyToastContainer
      stacked
      hideProgressBar
      closeButton={false}
      position="bottom-center"
      autoClose={5000}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      theme="colored"
      transition={undefined}
      icon={<CheckSingle />}
    />
  );
};

export default ToastContainer;
