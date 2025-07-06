import { useEffect } from 'react';
import { gsap } from 'gsap';

export const useGsapFromTo = (animations) => {
  useEffect(() => {
      const ctx = gsap.context(() => {
          animations.forEach(({ref,from,to})=>{
            if(ref?.current){
              gsap.fromTo(ref.current, from, to)
            }
          });
      });

      return () => ctx.revert();
  }, [animations]);
};
