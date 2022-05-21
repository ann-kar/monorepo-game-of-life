import { Dispatch, SetStateAction, useState } from 'react';

interface SizeInputProps {
  setBoardSize: Dispatch<SetStateAction<number>>;
  hasStarted: boolean;
}

export const SizeInput = ({ setBoardSize, hasStarted }: SizeInputProps) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  const handleChange = (size: number) => {
    if (size < 10 && size > 2) {
      setBoardSize(() => size);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="relative shadow-2xl border border-white   text-white rounded-none w-20 h-20 uppercase font-semibold text-sm tracking-wider hover:bg-slate-500 hover:text-white active:bg-slate-200 active:text-slate-700 transition-all duration-300">
      <label
        htmlFor="sizeInput"
        className="absolute bottom-20 right-0 font-bold w-[200%] text-right text-slate-700"
      >
        BOARD SIZE:
      </label>
      <input
        id="sizeInput"
        type="text"
        placeholder="10"
        className={`w-full h-full text-2xl text-center ${isCorrect ? 'text-slate-700' : 'text-[#FF896F]'} font-semibold overflow-hidden`}
        min="3"
        max="10"
        onChange={(e) => handleChange(Number(e.target.value))}
        disabled={hasStarted}
      />
      <small className="absolute top-20 right-0 font-bold w-[400%] text-right text-[#FF896F]">
        {!isCorrect ? 'please provide a number from 3 to 10' : ''}
      </small>
    </div>
  );
};
