import { useState } from "react";

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string>("");

  const toggle = (item?: string) => {
    setIsShown(!isShown);

    if (item && typeof item === "string") setSelectedItem(item);
  };

  return {
    isShown,
    toggle,
    selectedItem,
  };
};
