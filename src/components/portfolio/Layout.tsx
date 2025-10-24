import React from "react";

type LayoutComponent = React.FC<{ children: React.ReactNode }> & {
  Content: React.FC<{ children: React.ReactNode }>;
};

export const Layout: LayoutComponent = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {children}
      </div>
    </div>
  );
};

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="w-full py-8 md:py-16 space-y-16">{children}</main>
);

Layout.Content = Content;
