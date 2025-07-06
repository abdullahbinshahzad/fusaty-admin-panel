import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyTheme } from '../../utils/theme';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Helper for rendering stars
const renderStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full yellow star
      stars.push(
        <FaStar key={i} className="text-[#FDB022] w-5 h-5" />
      );
    } else if (rating >= i - 0.5) {
      // Half-filled star by clipping yellow over gray
      stars.push(
        <span key={i} className="relative w-5 h-5 block">
          {/* Background gray star */}
          <FaStar className="text-[#F5F5F5] absolute top-0 left-0 w-5 h-5" />
          {/* Left-half yellow star */}
          <FaStar
            className="text-[#FDB022] absolute top-0 left-0 w-5 h-5"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </span>
      );
    } else {
      // Full gray star
      stars.push(
        <FaStar key={i} className="text-[#F5F5F5] w-5 h-5" />
      );
    }
  }

  return <div className="flex gap-0.5">{stars}</div>;
};

// Helper for status badge
const statusStyles = {
  Approved: 'bg-[#55CE631A] text-[#55CE63]',
  Pending: 'bg-[#FFBC341A] text-[#FFBC34]',
  Rejected: 'bg-[#F62D511A] text-[#F62D51]',
  Deactivated: 'bg-[#4966831A] text-[#496683]',
};

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-500'}`}>{status}</span>
);

const DataTable = ({ columns, data }) => {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);
  return (
    <div className="overflow-x-auto shadow-sm bg-background-tbody">
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-background-thead text-text-tablehead text-sm font-semibold border-y border-[#B4B4B4]">
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3">{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-[#F0F0F0]">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-3 whitespace-nowrap align-middle">
                  {col.render
                    ? col.render(row[col.key], row)
                    : col.key === 'status'
                    ? <StatusBadge status={row[col.key]} />
                    : col.key === 'rating'
                    ? renderStars(row[col.key])
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 