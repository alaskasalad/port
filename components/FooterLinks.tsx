import { BASE_PATH } from "@/lib/base-path";
import { HoverLink } from "./HoverCell";

export default function FooterLinks() {
  return (
    <p className="links">
      <HoverLink
        href="https://www.linkedin.com/in/caitlinbox"
        target="_blank"
        rel="noopener"
        aria-label="LinkedIn"
        data-tooltip="LinkedIn"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="2" />
          <circle cx="7.5" cy="7.8" r="0.6" />
          <path d="M7.5 10.5v6.5M11 17v-6.5M11 13.2c0-1.6 1-2.7 2.5-2.7s2.5 1 2.5 2.7V17" />
        </svg>
      </HoverLink>
      <HoverLink
        href={`${BASE_PATH}/Caitlin_Box_Resume.pdf`}
        target="_blank"
        rel="noopener"
        aria-label="Resume PDF"
        data-tooltip="Resume pdf"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 2.5h8l4.5 4.5v14.5H6z" />
          <path d="M14 2.5V7h4.5M9 12h6M9 15.5h6M9 19h4" />
        </svg>
      </HoverLink>
    </p>
  );
}
