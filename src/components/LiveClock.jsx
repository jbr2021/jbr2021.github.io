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

      // System Timezone Name / Offset
      let timeZoneName = '';
      try {
        timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // Shorten long timezones if needed
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
    <div className={`live-clock-badge d-inline-flex align-items-center gap-2 px-2.5 py-1 rounded-pill bg-body-tertiary border text-body-secondary font-monospace x-small ${className}`} title={`System Local Timezone: ${timeState.tzStr}`}>
      <span className="pulse-dot-sm bg-success flex-shrink-0"></span>
      <span className="fw-semibold text-cyan">{timeState.dateStr}</span>
      <span className="text-muted">|</span>
      <span className="fw-bold text-body">{timeState.timeStr}</span>
      {timeState.tzStr && <span className="text-muted d-none d-xl-inline">({timeState.tzStr})</span>}
    </div>
  );
};

export default LiveClock;
