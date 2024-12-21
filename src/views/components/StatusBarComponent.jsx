import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function StatusBarComponent() {
  const { message, messageType, showStatusBar } = useSelector(
    (state) => state.message
  );

  const [show, setShow] = useState('show');

  useEffect(() => {
    if (showStatusBar) {
      setShow('show');

      const timer = setTimeout(() => {
        setShow('hide');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showStatusBar]);

  const minimize = () => {
    if (show == 'show') {
      setShow('hide');
    }
  };

  return (
    message && (
      <span className={`modal-overlay ${show}`}>
        <div className="status">
          <span className="close">
            <button onClick={minimize}>
              <h3>X</h3>
            </button>
          </span>

          <div className={`status-bar card ${messageType}`} id="status_bar">
            <span>{message}</span>
          </div>
        </div>
      </span>
    )
  );
}

export default StatusBarComponent;
