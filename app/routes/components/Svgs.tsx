export function Logo({ className = "", viewBox = "0 0 1200 1200" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} version="1.0" viewBox={viewBox}>
      <path d="M60.1 91.1c-15.3 16.4-26.9 33.5-37.6 55.3C7.4 177.5.9 209.7 2.4 246c.8 18.4 1.8 25.6 5.7 41.3 10.4 42.1 28.2 74.3 58.4 105.6 9.2 9.5 28.9 25 42.5 33.4 16.5 10.1 38.7 19.1 59.5 24 26.5 6.3 16.7 6 213.7 6.4l179.6.4 127.5 127.5c70.1 70 128.1 128.8 129 130.5.8 1.7 1.2 4.1.9 5.3-.2 1.1-45.3 47-100.1 102C607.9 933.8 601.7 940 599.4 940c-1.7 0-143.1-141.3-169.6-169.5-18.8-19.9-23.3-24.4-33.3-33.2-12.4-10.9-17.5-16.2-17.5-18.6 0-1.5 16.4-18.5 53.6-55.8 29.5-29.5 53.2-53.9 52.8-54.1-.5-.3-40.3-.5-88.4-.4-80.5.1-87.8.2-91.3 1.8-2.5 1.2-21.3 19.3-55.1 53.1-28.3 28.3-51.8 52.3-52.4 53.4-.9 1.6-.6 2.7 1.4 5.4 3.8 5.2 396.5 397.8 398.5 398.4 3.9 1.3 11.4-5.1 32.6-27.5 3.4-3.6 87.7-88 187.3-187.5 99.6-99.6 182.1-182.3 183.2-183.8l2.1-2.9-2.2-2.8c-3.9-5.3-398.5-400.2-401.6-401.8-2.8-1.6-18.9-1.7-202-1.8-109.4-.1-202.4-.5-206.5-.8-19.6-1.8-42.5-11-63-25.4-9.8-6.9-28.7-26.3-35.8-36.9-12.8-19-24.9-46.5-29.2-66.5-6.3-28.9-4.7-70.7 3.6-92.6 1.3-3.5 2.4-6.6 2.4-6.8 0-1.3-2.4.7-8.9 7.7zM1131 83.6c0 .7 1.1 4 2.4 7.5 1.3 3.5 3.4 11.3 4.7 17.4 2 9.5 2.4 13.8 2.3 32 0 17.5-.4 23.1-2.2 33.5-7.4 40.4-29.1 80-57.2 104.5-16.5 14.5-38.6 25.9-59.3 30.8-9.1 2.1-10.8 2.1-117.9 2.7-59.7.3-109 .9-109.4 1.3-.6.6 110.9 113.4 132.4 134 9.8 9.3 9.2 9.2 30.3 9.6 53.9 1 96.3-8.5 131.7-29.3 17.4-10.3 29.2-19.5 44.3-34.6 17.7-17.8 29.8-34.6 41-57.1 3.3-6.5 5.9-12 5.9-12.3 0-.4.9-2.5 2-4.9 4.1-9 10.8-33.6 13.4-49.8 4.6-28.1.8-71.9-8.6-99.4-4.9-14.4-15.8-36.5-24.6-50-7.5-11.4-31.1-38.6-31.2-35.9z" />
    </svg>
  );
}

export function LoadingSpinner({ additionalClasses = "" }) {
  return (
    <svg
      className={"animate-spin text-gray-400 " + additionalClasses}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export const Bold = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
  </svg>
);

export const Underline = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
    <line x1="4" y1="21" x2="20" y2="21"></line>
  </svg>
);

export const Italic = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 4h-9M14 20H5M14.7 4.7L9.2 19.4" />
  </svg>
);

export const Link = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

export const Code = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

export const Strikethrough = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 3.6 3.9h.2m8.2 3.7c.3.4.4.8.4 1.3 0 2.9-2.7 3.6-6.2 3.6-2.3 0-4.4-.3-6.2-.9M4 11.5h16" />
  </svg>
);

export const RotateLeft = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" />
  </svg>
);

export const RotateRight = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
  </svg>
);

export const X = ({ size = 16, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
