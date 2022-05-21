import { useState } from 'react';

export interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    onClick();
    if (!['tick', 'restart'].includes(label)) setIsClicked(!isClicked);
  };

  return (
    <button
      className="shadow-2xl border border-white first:bg-[#007879] bg-emerald-600 last:bg-[#008875] text-white rounded-none w-20 h-20 uppercase font-semibold text-xs tracking-wider hover:bg-transparent hover:text-emerald-700 active:bg-slate-200 active:text-slate-700 transition-all duration-300"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default Button;
