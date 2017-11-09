import React from 'react';

const SpinnerIcon = props => (
  <svg viewBox="0 0 1600 1600" {...props}>
    <circle cx="1500" cy="800" r="100" />
    <path d="M1600 800h-200c0-35.5-3.1-70.4-9-104.2l196.9-34.7h.1c7.9 45.1 12 91.5 12 138.9z" />
    <path
      opacity=".96"
      d="M1588 661.1h-.1L1391 695.8c-6.1-34.8-15.2-68.6-27-101.1l187.8-68.3.2-.1c15.7 43.3 27.8 88.3 36 134.8z"
    />
    <path
      opacity=".92"
      d="M1551.9 526.3l-.2.1-187.7 68.3c-12-33-26.9-64.7-44.3-94.8l173.1-100 .1-.1c23.2 40.2 43 82.4 59 126.5z"
    />
    <path
      opacity=".88"
      d="M1492.9 399.9l-.1.1-173.1 100c-17.5-30.3-37.7-59-60.1-85.6l153.2-128.6c29.9 35.5 56.7 73.7 80.1 114.1z"
    />
    <path
      opacity=".84"
      d="M1412.8 285.8l-153.2 128.6c-22.5-26.7-47.2-51.5-73.9-74l128.5-153.2c35.7 29.9 68.7 62.9 98.6 98.6z"
    />
    <path
      opacity=".8"
      d="M1314.2 187.1l-128.6 153.2c-26.7-22.4-55.3-42.5-85.6-60.1l99.9-173.1.1-.1c40.5 23.5 78.7 50.3 114.2 80.1z"
    />
    <path
      opacity=".76"
      d="M1200.1 107.1l-.1.1-99.9 173.1c-30.1-17.4-61.7-32.2-94.8-44.3l68.3-187.8.1-.2c44.1 16.1 86.3 35.9 126.4 59.1z"
    />
    <path
      opacity=".72"
      d="M1073.7 48l-.1.2-68.3 187.8c-32.5-11.8-66.2-20.9-101.1-27l34.7-196.9V12c46.5 8.1 91.5 20.3 134.8 36z"
    />
    <path
      opacity=".68"
      d="M938.9 12v.1L904.2 209c-33.8-5.9-68.7-9-104.2-9V0c47.4 0 93.8 4.1 138.9 12z"
    />
    <path
      opacity=".64"
      d="M800 0v200c-35.5 0-70.4 3.1-104.2 9L661.1 12.1V12C706.2 4.1 752.6 0 800 0z"
    />
    <path
      opacity=".6"
      d="M661.1 12.1L695.8 209c-34.8 6.1-68.6 15.2-101.1 27L526.4 48.2l-.1-.2c43.3-15.8 88.3-27.9 134.8-36v.1z"
    />
    <path
      opacity=".56"
      d="M526.4 48.2L594.7 236c-33 12-64.7 26.9-94.8 44.3L400 107.2l-.1-.1c40.1-23.2 82.3-43 126.4-59l.1.1z"
    />
    <path
      opacity=".04"
      d="M594.7 1364l-68.3 187.8-.1.2c-44.1-16-86.3-35.8-126.4-59l.1-.1 100-173.1c30 17.3 61.7 32.1 94.7 44.2z"
    />
    <path
      opacity=".52"
      d="M400 107.2l100 173.1c-30.3 17.6-59 37.7-85.6 60.1L285.8 187.2c35.5-29.9 73.7-56.7 114.2-80.1v.1z"
    />
    <path
      opacity=".08"
      d="M500 1319.7l-100 173.1-.1.1a804.44 804.44 0 0 1-114.2-80.1l128.6-153.2c26.7 22.4 55.3 42.6 85.7 60.1z"
    />
    <path
      opacity=".48"
      d="M285.8 187.2l128.6 153.2c-26.7 22.5-51.5 47.2-74 74L187.2 285.8c29.9-35.7 62.9-68.7 98.6-98.6z"
    />
    <path
      opacity=".12"
      d="M414.3 1259.6l-128.6 153.2c-35.7-29.9-68.7-62.9-98.6-98.6l153.2-128.5c22.5 26.7 47.3 51.5 74 73.9z"
    />
    <path
      opacity=".44"
      d="M187.2 285.8l153.2 128.6C318 441 297.9 469.6 280.3 500L107.2 400l-.1-.1c23.4-40.4 50.2-78.6 80.1-114.1z"
    />
    <path
      opacity=".16"
      d="M340.4 1185.7l-153.2 128.5c-29.9-35.6-56.7-73.7-80.1-114.2l.1-.1 173.1-99.9c17.6 30.4 37.7 59 60.1 85.7z"
    />
    <path
      opacity=".4"
      d="M107.2 400l173.1 100c-17.4 30-32.2 61.7-44.3 94.8L48.2 526.4l-.2-.1c16-44.1 35.8-86.3 59-126.4l.2.1z"
    />
    <path
      opacity=".2"
      d="M280.3 1100.1L107.2 1200l-.1.1c-23.2-40.1-43-82.3-59-126.4l.2-.1 187.8-68.3c12 33 26.8 64.7 44.2 94.8z"
    />
    <path
      opacity=".36"
      d="M48.2 526.4L236 594.7c-11.8 32.5-20.9 66.2-27 101.1L12.1 661.1H12c8.1-46.4 20.2-91.5 36-134.8l.2.1z"
    />
    <path
      opacity=".24"
      d="M236 1005.3l-187.8 68.3-.2.1c-15.8-43.3-27.9-88.3-36-134.7h.1L209 904.2c6.1 34.8 15.2 68.6 27 101.1z"
    />
    <path
      opacity=".32"
      d="M12.1 661.1L209 695.8c-5.9 33.8-9 68.7-9 104.2H0c0-47.4 4.1-93.8 12-138.9h.1z"
    />
    <path
      opacity=".28"
      d="M209 904.2L12.1 938.9H12C4.1 893.8 0 847.4 0 800h200c0 35.5 3.1 70.4 9 104.2z"
    />
  </svg>
);

export default SpinnerIcon;
