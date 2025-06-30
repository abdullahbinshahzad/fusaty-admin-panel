import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Helper for rendering stars
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-[#FFC107]" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-[#FFC107]" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-[#FFC107]" />);
    }
  }
  return <div className="flex gap-0.5">{stars}</div>;
};

// Helper for status badge
const statusStyles = {
  Approved: 'bg-[#E6F9ED] text-[#2ECC71]',
  Pending: 'bg-[#FFF7E6] text-[#FFB200]',
  Rejected: 'bg-[#FFE6E6] text-[#FF4D4F]',
  Deactivated: 'bg-[#E6EAF9] text-[#7D8B9E]',
};

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-500'}`}>{status}</span>
);

const DataTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto shadow-sm bg-white">
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-[#DFE6ED] text-[#3B4A6B] text-sm font-semibold border-y border-[#B4B4B4]">
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 whitespace-nowrap">{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-[#F0F0F0] hover:bg-[#F5F8FC]">
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