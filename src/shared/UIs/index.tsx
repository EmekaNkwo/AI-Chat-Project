type SegmentedControlProps = {
  options: string[];
  selectedOption?: string;
  onChange?: (option: string) => void;
};

const SegmentedControl = ({
  options,
  selectedOption,
  onChange,
}: SegmentedControlProps) => {
  return (
    <div className="flex bg-[#202020] rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange?.(option)}
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-sm 
            ${
              selectedOption === option
                ? "bg-[#E4E4E4] text-[#121212]"
                : "bg-transparent text-[#FFFFFF] hover:bg-gray-100 hover:text-[#121212] "
            } transition-colors`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export const ActionIcon = ({ icon }: { icon: JSX.Element }) => {
  return (
    <div className="flex items-center cursor-pointer justify-center w-10 h-10 bg-[#202020] rounded-[6px]">
      {icon}
    </div>
  );
};

export const IconWithText = ({
  icon,
  text,
  onClick,
}: {
  icon: JSX.Element;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex items-center cursor-pointer gap-2 justify-center text-white "
      onClick={onClick}
    >
      {icon} <span className="text-[13px] font-[500]">{text}</span>
    </div>
  );
};

export default SegmentedControl;
