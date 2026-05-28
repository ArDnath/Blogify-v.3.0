import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-10">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-2 py-2 border-t-4 border-gray-300 dark:border-gray-700">
        {/* Copyright */}
        <div className="text-xl">
          © {new Date().getFullYear()} Ariyaman Debnath. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
