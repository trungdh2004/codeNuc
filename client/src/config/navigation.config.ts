import { useTranslation } from "react-i18next";
import { GoHomeFill } from "react-icons/go";
import {
	MdOutlinePlayCircleFilled,
	MdTextSnippet,
	MdBook,
} from "react-icons/md";
import { PiStarFourFill } from "react-icons/pi";

export const useNavigatePage = () => {
  const { t } = useTranslation();
  return [ 
    { 
      label: t("navigator.home"), 
      link: "/", 
      icon: GoHomeFill, 
    }, 
    { 
      label: t("navigator.snippet"), 
      link: "/snippets", 
      icon: MdTextSnippet, 
    }, 
    { 
      label: t("navigator.editor"), 
      link: "/editor", 
      icon: MdOutlinePlayCircleFilled, 
    }, 
    { 
      label: t("navigator.community"), 
      link: "/blogs", 
      icon: MdBook, 
    }, 
    { 
      label: t("navigator.ai"), 
      link: "/ai", 
      icon: PiStarFourFill, 
    }, 
  ];
};

export default useNavigatePage;