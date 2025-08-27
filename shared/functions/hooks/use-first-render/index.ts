import { useRef } from 'react';

const useFirstRender = () => {
  const isFirstRender = useRef(true);

  const setIsFirstRender = () => {
    isFirstRender.current = false;
  };

  return { isFirstRender: isFirstRender.current, setIsFirstRender };
};

export default useFirstRender;