import { css, cx } from 'emotion';
import React from 'react';
import ReactModal from 'react-modal';

const cModal = css`
  background-color: #ffffff;
  border-radius: 2px;
  bottom: auto;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  left: 50%;
  right: auto;
  max-width: 865px;
  min-width: 640px;
  outline: none;
  overflow: auto;
  padding: 16px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const cModalHeader = css`
  margin-bottom: 32px;
`;

const cModalBody = css``;

const cModalFooter = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;

  > * + * {
    margin-left: 8px;
  }
`;

const cOverlay = css`
  background-color: rgba(0, 0, 0, 0.32);
  bottom: 0px;
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
`;

function ModalHeader({ className, ...rest }) {
  return <header {...rest} className={cx(cModalHeader, className)} />;
}

function ModalBody({ className, ...rest }) {
  return <section {...rest} className={cx(cModalBody, className)} />;
}

function ModalFooter({ className, ...rest }) {
  return <footer {...rest} className={cx(cModalFooter, className)} />;
}

function Modal({ className, onClose, open, ...rest }) {
  return (
    <ReactModal
      {...rest}
      className={cx(cModal, className)}
      isOpen={open}
      onRequestClose={onClose}
      overlayClassName={cOverlay}
    />
  );
}

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;

export default Modal;
