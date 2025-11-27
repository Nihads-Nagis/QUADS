import React from 'react';

// SVG Icons - All defined
const CircleIcon = () => (
  <svg className="hx-icon" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"/>
  </svg>
);

const LockIcon = () => (
  <svg className="hx-icon" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
  </svg>
);

const DangerIcon = () => (
  <svg className="hx-icon" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,22C10.05,22 8.22,21.44 6.69,20.47L10,15.47C10.6,15.81 11.28,16 12,16C12.72,16 13.4,15.81 14,15.47L17.31,20.47C15.78,21.44 13.95,22 12,22M2,12C2,7.86 4.5,4.3 8.11,2.6L10.34,7.58C8.94,8.53 8,10.12 8,12H2M16,12C16,10.12 15.06,8.53 13.66,7.58L15.89,2.6C19.5,4.3 22,7.86 22,12H16Z"/>
  </svg>
);

// Main HxItem Component
export const HxItem = ({ 
  number, 
  title, 
  status = 'active', 
  summary, 
  depth = 1,
  children 
}) => {
  const isLocked = status === 'locked' || status === 'danger';
  const isDanger = status === 'danger';
  
  const getIcon = () => {
    if (isDanger) return <DangerIcon />;
    if (isLocked) return <LockIcon />;
    return <CircleIcon />;
  };

  const getStatusText = () => {
    if (isDanger) return 'Danger Zone';
    if (isLocked) return 'Locked';
    return 'Active';
  };

  return (
    <div className={`hx-depth-${depth}`}>
      <div className={`hx-item H${number} ${isLocked ? 'locked' : ''} ${isDanger ? 'danger' : ''}`}>
        <div className="hx-header">
          <div className="hx-sphere">
            {getIcon()}
          </div>
          <h3 className="hx-title">{title}</h3>
          <span className={`hx-status ${status}`}>
            {getStatusText()}
          </span>
        </div>
        <div className="hx-content">
          {children}
        </div>
        {summary && (
          <div className="hx-summary">
            {summary}
          </div>
        )}
      </div>
    </div>
  );
};

// Container component
export const HxTable = ({ depth = 2, children }) => (
  <div className={`hx-table-container hx-depth-${depth}`}>
    {children}
  </div>
);