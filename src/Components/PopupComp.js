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
          {/* Apologies for the inconvenience. We are experiencing technical issues
          from the Swiggy side and are working to resolve them. Please try again
          later. Thank you for your patience. */}
          Apologies for the inconvenience. We are experiencing technical issues
          on the Swiggy side and are working to resolve them. Meanwhile, you can
          install a CORS extension in your browser{" "}
          <span>
            <a
              href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en&pli=1"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              <strong>here</strong>
            </a>
          </span>
          , and you should be good to go.
        </p>
      </Modal>
    </>
  );
};
export default PopupComp;
