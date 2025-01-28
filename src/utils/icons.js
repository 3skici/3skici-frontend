// utils/icons.js
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";

const ICON_LIBRARIES = {
  Fa: FaIcons,
  Md: MdIcons,
  Io: IoIcons,
};

export const getIconComponent = (iconName) => {
  const prefix = iconName.substring(0, 2);
  const library = ICON_LIBRARIES[prefix];
  return library ? library[iconName] : FaIcons.FaQuestionCircle;
};
