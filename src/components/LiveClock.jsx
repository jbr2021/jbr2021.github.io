import React, { useState, useEffect } from 'react';

const LiveClock = ({ className = '' }) => {
  const [timeState, setTimeState] = useState({ timeStr: '', dateStr: '', tzStr: '' });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      // Format Date: dd-MMM-yyyy
      const day = String(now.getDate()).padStart(2, '0');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      const dateFormatted = `${day}-${month}-${year}`;

      // Format Time with seconds (HH:mm:ss)
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeFormatted = `${hours}:${minutes}:${seconds}`;

      // System Timezone
      let timeZoneName = '';
      try {
        timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZoneName.includes('/')) {
          timeZoneName = timeZoneName.split('/')[1].replace(/_/g, ' ');
        }
      } catch (e) {
        timeZoneName = 'Local';
      }

      setTimeState({
        timeStr: timeFormatted,
        dateStr: dateFormatted,
        tzStr: timeZoneName
      });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`live-clock-line d-inline-flex align-items-center gap-1.5 font-monospace text-body-secondary ${className}`} title={`System Local Timezone: ${timeState.tzStr}`}>
      <i className="bi bi-clock-history text-cyan me-0.5"></i>
      <span className="fw-semibold text-body-secondary" style={{ fontSize: '0.74rem' }}>{timeState.dateStr}</span>
      <span className="text-muted">|</span>
      <span className="fw-bold text-cyan" style={{ fontSize: '0.76rem' }}>{timeState.timeStr}</span>
      {timeState.tzStr && <span className="text-muted" style={{ fontSize: '0.7rem' }}>({timeState.tzStr})</span>}
    </div>
  );
};

export default LiveClock;
