import classNames from 'classnames';
import { ReactNode, useState, useRef, useEffect } from 'react';

type PositionType = 'top' | 'bottom' | 'left' | 'right';

interface ITooltipProps {
  message: string | ReactNode;
  position?: PositionType;
  children: ReactNode;
  subChildren?: ReactNode;
}

const Position = {
  top: 'bottom-full left-1/2 mb-2.5 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2.5 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2.5 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2.5 -translate-y-1/2',
};

const ArrowPosition = {
  top: '-bottom-1 left-1/2 -translate-x-1/2',
  bottom: '-top-1 left-1/2 -translate-x-1/2',
  left: '-right-1.5 top-1/2 -translate-y-1/2',
  right: '-left-1.5 top-1/2 -translate-y-1/2',
};

export default function Tooltip({
  message,
  children,
  position = 'top',
  subChildren,
}: ITooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className='relative inline-block'
      onMouseEnter={() => setOpen(true)} // desktop hover
      onMouseLeave={() => setOpen(false)} // desktop hover out
      onClick={() => setOpen(prev => !prev)} // mobile tap
    >
      {children}
      <div
        className={classNames(
          'absolute z-[999999] transition-opacity duration-300',
          open ? 'visible opacity-100' : 'invisible opacity-0',
          Position[position]
        )}
      >
        {subChildren ? (
          <div className='relative'>
            {subChildren}
            <div
              className={classNames(
                'absolute h-3 w-4 rotate-45 bg-[#1E2634]',
                ArrowPosition[position]
              )}
            />
          </div>
        ) : (
          <div className='relative'>
            <div className='text-white bg-[#1E2634] whitespace-nowrap rounded-lg px-3 py-3 text-xs font-medium drop-shadow-4xl'>
              {message}
            </div>
            <div
              className={classNames(
                'absolute h-3 w-4 rotate-45 bg-[#1E2634]',
                ArrowPosition[position]
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
