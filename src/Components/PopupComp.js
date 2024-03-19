import React from "react";
import { Button, Modal } from "antd";
const PopupComp = ({ popup, setPopup }) => {
  const handleOk = () => {};
  const handleCancel = () => {
    setPopup(false);
  };
  return (
    <>
      <Modal
        open={popup}
        title="Tips!"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          // <Button key="submit" type="primary" onClick={handleOk}>
          //   Submit
          // </Button>,
          // <Button
          //   key="link"
          //   href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf"
          //   type="primary"
          //   target="_blank"
          //   onClick={handleOk}
          // >
          //   Install
          // </Button>,
        ]}
      >
        <p>
          Apologies for the inconvenience. We are experiencing technical issues
          from the Swiggy side and are working to resolve them. Please try again
          later. Thank you for your patience.
        </p>
      </Modal>
    </>
  );
};
export default PopupComp;
