import { ToastContainer as ToastifyToastContainer } from 'react-toastify';
import './ToastContainer.css';

const ToastContainer = () => {
  return (
    <ToastifyToastContainer
      stacked
      hideProgressBar
      closeButton={false}
      position="bottom-center"
      autoClose={1200}
      closeOnClick={true}
      draggable={true}
      draggablePercent={25}
      theme="colored"
      transition={undefined}
    />
  );
};

export default ToastContainer;
