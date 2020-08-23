import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
// jsx에서 ... spread 사용 시에 attribute를 동적으로 받아 넣을 수 있음..
const btn = ({children, ...rest}) => <button type="button" {...rest}>{children}</button>
const Button = ({children, to, onClick, disabled, theme = 'default',}) => {
const Element = (to && !disabled) ? Link : btn;
  return (
    <Element to={to} className={cx('button', theme, {disabled})} onClick={disabled ? () => null : onClick}>
      {children}
    </Element>
  )
};

export default Button;