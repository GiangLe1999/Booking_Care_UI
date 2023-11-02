import { FC } from "react";
import { IconType } from "react-icons";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

interface Props {
  onClick?: any;
  content: string;
  icon?: IconType;
  iconBehind?: IconType;
  iconSize?: number;
  href?: string;
  customClasses?: string;
  type?: string;
  to?: string;
  external?: boolean;
  iconCustomClasses?: string;
}

const BtnWithIcon: FC<Props> = ({
  onClick,
  content,
  icon,
  iconBehind,
  href,
  iconSize,
  customClasses,
  type,
  to,
  external,
  iconCustomClasses,
}): JSX.Element => {
  let Component = "button" as any;
  if (!onClick && href) {
    Component = "a" as any;
  }

  if (!onClick && to) {
    Component = Link as any;
  }

  let externalLinkAttr = {};
  if (external) {
    externalLinkAttr = { target: "_blank", rel: "noopener noreferrer" };
  }

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`primary-btn ${customClasses}`}
      type={type}
      {...externalLinkAttr}
    >
      <span className="flex items-center justify-center gap-x-1">
        {icon && icon({ size: iconSize, className: iconCustomClasses })}
        <FormattedMessage id={`button.${content}`} />

        {iconBehind &&
          iconBehind({ size: iconSize, className: iconCustomClasses })}
      </span>
    </Component>
  );
};

export default BtnWithIcon;
