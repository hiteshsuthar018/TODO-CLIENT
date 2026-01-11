import React from "react";
import AppLayout from "../components/layout/AppLayout";
import EmptyState from "../components/common/EmptyState";

const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      {/*  empty state on desktop */}
      <div className="hidden lg:flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md text-center">
          <EmptyState message="Select a board from the sidebar to get started" />
        </div>
      </div>
      
      {/* On mobile sidebar */}
      <div className="lg:hidden">
        <EmptyState message="Select a board from the list" />
      </div>
    </AppLayout>
  );
};

export default Dashboard;