import React, { useRef, useState, useEffect } from 'react';

/**
 * AnimatedHeight — wraps children in a container whose height
 * transitions smoothly whenever the inner content changes size.
 *
 * Uses ResizeObserver on the inner div so it reacts to any content
 * change (tab switch, conditional render, dynamic list, etc.) without
 * requiring the parent to pass explicit height values.
 *
 * @param {React.ReactNode} children  - Content whose height may change
 * @param {string}          className - Optional classes on the outer div
 * @param {number|string}   duration  - CSS transition duration (default '0.38s')
 * @param {string}          easing    - CSS easing (default cubic-bezier snappy spring)
 */
export default function AnimatedHeight({
  children,
  className = '',
  duration = '0.38s',
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
}) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    // Set initial height synchronously to avoid a 0→auto jump on first paint
    setHeight(el.scrollHeight);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use scrollHeight so padding/border are included correctly
        setHeight(entry.target.scrollHeight);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={className}
      style={{
        height: height === 'auto' ? 'auto' : `${height}px`,
        overflow: 'hidden',
        transition: `height ${duration} ${easing}`,
      }}
    >
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  );
}
