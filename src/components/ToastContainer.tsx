import { ToastContainer as ToastifyToastContainer } from 'react-toastify';
import './ToastContainer.css';
// import 'react-toastify/dist/ReactToastify.css';

import Check from 'public/icons/toasty-check.svg';

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
      icon={<Check />}
    />
  );
};

export default ToastContainer;
