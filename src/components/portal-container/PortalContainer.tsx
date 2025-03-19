import { MODAL_PORTAL_ID } from '../modals/ModalPortal';
import { BOTTOM_SHEET_PORTAL_ID } from '../bottom-sheet/BottomSheetPortal';

const PortalContainer = () => {
  return (
    <>
      <div id={BOTTOM_SHEET_PORTAL_ID} />
      <div id={MODAL_PORTAL_ID} />
    </>
  );
};

export default PortalContainer;
