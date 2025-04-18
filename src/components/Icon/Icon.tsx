import icons from "../../img/icons.svg";
import css from "./Icon.module.css";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: string;
}

export const Icon: React.FC<IconProps> = ({ id, ...props }) => (
  <svg className={css.icon} {...props}>
    <use href={`${icons}#${id}`}></use>
  </svg>
);