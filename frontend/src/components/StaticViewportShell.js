import { useLayoutEffect, useRef, useState } from 'react';

const StaticViewportShell = ({ active = false, children }) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!active) {
      setScale(1);
      return undefined;
    }

    let frame = 0;

    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;

        if (!outer || !inner) return;

        const naturalHeight = inner.scrollHeight;
        const availableHeight = outer.clientHeight;

        if (!naturalHeight || !availableHeight) {
          setScale(1);
          return;
        }

        const nextScale = Math.min(1, availableHeight / naturalHeight);
        setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1);
      });
    };

    measure();

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => measure())
      : null;

    if (observer && innerRef.current) {
      observer.observe(innerRef.current);
    }

    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
      observer?.disconnect();
    };
  }, [active, children]);

  return (
    <div
      ref={outerRef}
      className={`static-viewport-shell${active ? ' is-static' : ''}`}
    >
      <div
        ref={innerRef}
        className="static-viewport-inner"
        style={active ? { transform: `scale(${scale})` } : undefined}
      >
        {children}
      </div>
    </div>
  );
};

export default StaticViewportShell;
