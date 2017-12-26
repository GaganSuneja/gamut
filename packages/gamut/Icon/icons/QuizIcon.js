import React from 'react';
import defaultProps from '../defaultProps';

export default function QuizIcon(props) {
  return (
    <svg viewBox="0 0 24 24" version="1.1" {...defaultProps(props)}>
      <title>Quiz Icon</title>
      <g fill="currentColor" fillRule="evenodd">
        <path d="M17.158 16.263v2.842A1.895 1.895 0 0 1 15.263 21H3.895A1.895 1.895 0 0 1 2 19.105V5.842c0-1.046.848-1.895 1.895-1.895h11.368c1.047 0 1.895.849 1.895 1.895v.947H14.99V6H4V19h11v-2.737h2.158z" />
        <path
          d="M18.962 6.257a.87.87 0 0 0-.609.25l-1.205 1.205 3.013 3.019 1.205-1.194a.85.85 0 0 0 0-1.217l-1.802-1.813a.867.867 0 0 0-.602-.25m-2.217 1.859l-4.604 4.61 1.455.159.102 1.302 1.296.096.165 1.455 4.604-4.61m-7.958 2.126l-.994 3.803 3.808-1.017-.136-1.228-1.314-.097-.102-1.319"
          fillRule="nonzero"
        />
        <path d="M6 9h2v2H6zM6 12h2v2H6zM6 15h2v2H6z" />
      </g>
    </svg>
  );
}
