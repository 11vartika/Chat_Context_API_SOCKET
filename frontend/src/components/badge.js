// src/Badge.js
import React from 'react';
import './badge.css';

const Badge = ({ text, color, backgroundColor, fontSize, borderRadius, padding }) => {
  const badgeStyle = {
    color: color || 'white',
    backgroundColor: backgroundColor || 'gray',
    fontSize: fontSize || '14px',
    borderRadius: borderRadius || '12px',
    padding: padding || '5px 10px',
    display: 'inline-block',
  };

  return <span style={badgeStyle}>{text}</span>;
};

export default Badge;
