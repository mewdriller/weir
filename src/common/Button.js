import React from 'react';
import { css, cx } from 'emotion';

const sButton = css`
  align-items: center;
  background: none;
  border: none;
  border-radius: 4px;
  color: #6200ee;
  display: inline-flex;
  fill: #6200ee;
  font-size: 14px;
  font-weight: bold;
  height: 36px;
  justify-content: center;
  min-width: 64px;
  outline-style: none;
  overflow: hidden;
  padding: 0 8px;
  position: relative;
  text-transform: uppercase;

  &::before {
    background-color: #6200ee;
    content: '';
    height: 200%;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 15ms linear;
    width: 200%;
    z-index: 1;
  }

  &:disabled {
    color: #0000001e;
    fill: #0000001e;
  }

  &:focus:not(:disabled)::before {
    opacity: 0.12;
  }

  &:hover:not(disabled)::before {
    opacity: 0.04;
  }
`;

const sButonOutlined = css`
  border: 1px solid #0000001e;
  color: #6200ee;
  fill: #6200ee;
  padding: 0 16px;

  &::before {
    background-color: #6200ee;
    content: '';
    height: 200%;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 15ms linear;
    width: 200%;
    z-index: 1;
  }

  &:disabled {
    color: #0000001e;
    fill: #0000001e;
  }

  &:focus:not(:disabled)::before {
    opacity: 0.12;
  }

  &:hover:not(disabled)::before {
    opacity: 0.04;
  }
`;

const sButtonContained = css`
  background-color: #6200ee;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  color: #ffffff;
  fill: #ffffff;
  padding: 0 16px;

  &::before {
    background-color: #ffffff;
    content: '';
    height: 200%;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 15ms linear;
    width: 200%;
    z-index: 1;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.12);
    box-shadow: none;
    color: rgba(0, 0, 0, 0.37);
  }

  &:focus:not(:disabled)::before {
    opacity: 0.24;
  }

  &:hover:not(disabled)::before {
    opacity: 0.08;
  }
`;

const sIconButton = css`
  padding-left: 12px;
`;

const sIcon = css`
  height: 18px;
  margin-right: 8px;
  width: 18px;
`;

function Button({ children, contained, icon, outlined, ...rest }) {
  const IconComponent = icon;

  return (
    <button
      type="button"
      {...rest}
      className={cx(sButton, {
        [sButtonContained]: contained,
        [sButonOutlined]: outlined,
        [sIconButton]: icon,
      })}
    >
      {icon && <IconComponent className={sIcon} />}
      {children}
    </button>
  );
}

export default Button;
