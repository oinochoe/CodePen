import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Footer = ({ onLoginClick, logged }) => (
    <footer className={cx('footer')}>
        {/* <Link to="/" className={cx('brand')}>PEN</Link> */}
        {/* <div onClick={onLoginClick} className={cx('admin-login')}>
      { logged ? '로그아웃' : '로그인' }
    </div> */}
        &copy;
    </footer>
);

export default Footer;
