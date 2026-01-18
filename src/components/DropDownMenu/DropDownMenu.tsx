import React from "react";

interface DropDownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    label: string;
    onClick: (e: React.MouseEvent) => void;
    icon: string;
    textColor: string;
  }>;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
}) => {
  return (
    <div
      className={`dropdown-menu relative right-0 bg-white shadow-lg rounded-md
                w-[96px] md:w-[128px] xl:w-[117px] z-10 ${
                  isOpen ? "block" : "hidden"
                }`}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`w-full text-left px-4 py-2 text-sm ${
            item.textColor || "text-gray-700"
          } hover:bg-gray-100 flex items-center`}
          onClick={(e) => {
            e.stopPropagation();
            item.onClick(e);
            onClose();
          }}
        >
          <svg
            width="16"
            height="16"
            className="mr-2 stroke-current fill-transparent"
          >
            <use href={`/src/icons/icons.svg#${item.icon}`}></use>
          </svg>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default DropDownMenu;
