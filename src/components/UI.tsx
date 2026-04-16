'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export const Section = ({ children, className, id, containerClassName }: SectionProps) => {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      <div className={cn('container mx-auto px-4 md:px-6', containerClassName)}>{children}</div>
    </section>
  );
};

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  as: Component = 'button',
  type = 'button',
  ...props
}: ButtonProps) => {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-accent shadow-lg shadow-primary/20',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base md:text-lg',
    lg: 'px-8 py-4 text-lg md:text-xl',
  };

  const MotionComponent = React.useMemo(() => {
    return motion.create(Component as any);
  }, [Component]);

  const componentProps = Component === 'button' ? { type, ...props } : props;

  return (
    <MotionComponent
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer',
        variants[variant],
        sizes[size],
        className,
      )}
      {...componentProps}
    >
      {children}
    </MotionComponent>
  );
};
