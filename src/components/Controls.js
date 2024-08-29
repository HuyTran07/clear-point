import React from 'react';
import '../style/Controls.css';

const Controls = ({ circleCount, setCircleCount, time, handleRestart, buttonColor, statusMessage, statusColor }) => {

  const handleKeyDown = (e) => {
    // Ngăn chặn việc nhập các ký tự không phải số và các ký tự điều khiển (như dấu chấm)
    if (!/[\d]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      e.preventDefault();
    }
  };

  const handleCircleCountChange = (e) => {
    const value = e.target.value;
    // Kiểm tra nếu giá trị là một chuỗi trống
    if (value === '') {
      setCircleCount('');
    } else {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue === '') {
        setCircleCount('');
      } else {
        const formattedValue = Math.max(0, Number(numericValue));
        setCircleCount(formattedValue);
      }
    }
  };

  return (
    <div className="controls-container">
      <h2 style={{ color: statusColor }}>{statusMessage}</h2>
      <div className="controls">
        <div>
          Points:
          <input
            type="text" // Sử dụng type="text" để kiểm soát hoàn toàn việc nhập
            value={circleCount === '' ? '' : circleCount} // Đảm bảo input có thể trống
            onChange={handleCircleCountChange}
            onKeyDown={handleKeyDown} // Ngăn chặn việc nhập ký tự không hợp lệ
            className="input-circle-count"
            inputMode="numeric" // Yêu cầu bàn phím số trên các thiết bị di động
            pattern="[0-9]*" // Đảm bảo chỉ nhận số
          />
        </div>
        <div>
          Time: <span className="time-display">{time.toFixed(1)}s</span>
        </div>
        <button
          className="restart-button"
          onClick={handleRestart}
          style={{ backgroundColor: buttonColor }}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Controls;
