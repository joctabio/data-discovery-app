import React from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  nonActiveClassName?: string;
};

const NavLink = ({
  children,
  href,
  activeClassName,
  nonActiveClassName,
  className,
  ...rest
}: NavLinkProps) => {
  const currentPath = usePathname();
  const isActive = currentPath === href;
  const classes = `${
    isActive ? activeClassName : nonActiveClassName
  } ${className}`;

  return (
    <Link className={`${classes}`} href={href} {...rest}>
      {children}
    </Link>
  );
};

export default NavLink;
