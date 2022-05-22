import { Dispatch, SetStateAction, useState } from 'react';
import { isSizeValid } from '../utils/utils';

interface SizeInputProps {
  setBoardSize: Dispatch<SetStateAction<number>>;
  hasStarted: boolean;
}

export const SizeInput = ({ setBoardSize, hasStarted }: SizeInputProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (size: number) => {
    setBoardSize(() => size);
    setIsValid(isSizeValid(size));
  };

  return (
    <div className="relative shadow-2xl border border-white text-white rounded-none w-20 h-20 uppercase font-semibold text-sm tracking-wider transition-all duration-300">
      <label
        htmlFor="sizeInput"
        className="absolute bottom-20 right-0 font-bold w-[200%] text-right text-slate-700"
      >
        BOARD SIZE:
      </label>
      <input
        id="sizeInput"
        type="number"
        defaultValue={10}
        className={`w-full h-full text-2xl text-center ${
          isValid ? 'text-slate-700 disabled:text-white' : 'text-[#FF896F]'
        } font-semibold overflow-hidden focus:outline-slate-700 disabled:bg-slate-300 disabled:text-white`}
        min="3"
        max="10"
        onChange={(e) => handleChange(Number(e.target.value))}
        disabled={hasStarted}
      />
      <small className="absolute top-20 right-0 font-bold w-[400%] text-right text-[#FF896F]">
        {!isValid ? 'please provide a number from 3 to 10' : ''}
      </small>
    </div>
  );
};
