import { type } from "os";
import { useState } from "react";

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string | any>("");

  const toggle = (item?: string | any) => {
    setIsShown(!isShown);
    if (item) setSelectedItem(item);
    // if (item && typeof item === "string") setSelectedItem(item);
  };

  return {
    isShown,
    toggle,
    selectedItem,
  };
};
