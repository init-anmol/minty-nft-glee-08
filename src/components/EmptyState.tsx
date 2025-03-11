
import React, { ReactNode } from 'react';
import AnimatedContainer from './AnimatedContainer';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => {
  return (
    <AnimatedContainer animation="scale" className="w-full py-12">
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
        <div className="rounded-full bg-muted/50 p-4 mb-4">
          {icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-8 text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="16" />
              <line x1="8" x2="16" y1="12" y2="12" />
            </svg>
          )}
        </div>
        <h3 className="text-xl font-medium mt-2">{title}</h3>
        <p className="text-muted-foreground max-w-md mt-1">{description}</p>
      </div>
    </AnimatedContainer>
  );
};

export default EmptyState;
