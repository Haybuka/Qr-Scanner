import React from 'react';

const Header = ({ text }: { text: string }) => {
  return <h1 className="uppercase text-lg mb-6 font-semibold ">{text}</h1>;
};

export default Header;
