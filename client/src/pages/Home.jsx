import React from 'react';
import CoursePage from './Courses/CoursePage';

const AppLayout = () => {
  return (
      <div className="flex-grow">
        {/* Main content area */}
        <CoursePage />
    </div>
  );
};

export default AppLayout;
