import { RefObject } from "react";

export const useDropDownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {

  const getDropDownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    const drowpdownWidth = 240; //w-60 =15rem=240px
    //calculate initial position
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY;
    //check if viewport would go off the right edge of view port
    if (left + drowpdownWidth > window.innerWidth) {
      //aligne to righe edge of button insteed
      left = rect.right - window.scrollX - drowpdownWidth;
      if (left < 0) {
        left = window.innerWidth - drowpdownWidth - 16;
      }
    }
    if (left < 0) {
      left = 16;
    }
    return { top, left };
  };

  return { getDropDownPosition };
};
