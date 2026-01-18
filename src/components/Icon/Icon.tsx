import icons from "/src/icons/icons.svg"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: string;
}

export const Icon: React.FC<IconProps> = ({ id, ...props }) => (
  <svg className="stroke-transparent fill-primary" {...props}>
    <use href={`${icons}#${id}`}></use>
  </svg>
);