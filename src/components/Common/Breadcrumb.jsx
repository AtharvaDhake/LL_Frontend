import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center hover:text-primary transition-colors"
      >
        <FaHome className="mr-1" />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <FaChevronRight className="text-gray-400 text-xs" />
          {item.link ? (
            <Link 
              to={item.link} 
              className="hover:text-primary transition-colors capitalize"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium capitalize">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
