
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade' | 'slide-up' | 'scale' | 'slide-right' | 'none';

interface AnimatedContainerProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  className
}) => {
  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'scale':
        return 'animate-scale-in';
      case 'slide-right':
        return 'animate-slide-in-right';
      case 'none':
        return '';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div 
      className={cn(getAnimationClass(), className)}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
