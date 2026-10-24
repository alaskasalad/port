import FooterLinks from "./FooterLinks";
import { HoverLink } from "./HoverCell";
import Reveal from "./Reveal";
import Starbursts from "./Starbursts";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Reveal>
        <div className="hero-top" data-reveal>
          <h1 className="name">Caitlin Box</h1>
          <div className="hero-side">
            <nav className="tabs">
              <HoverLink className="tab" href="#about">About</HoverLink>
              <HoverLink className="tab" href="#work">Work</HoverLink>
            </nav>
            <p className="role">
              Solutions Engineer
              <br />
              Client Expert
            </p>
          </div>
        </div>

        <Starbursts />

        <footer className="hero-foot" data-reveal>
          <p className="location">
            Orlando, FL
            <span>Open to relocation</span>
          </p>
          <p className="contact">
            Get in contact:
            <br />
            <a href="mailto:caitlinboxw@gmail.com">caitlinboxw@gmail.com</a>
          </p>
          <FooterLinks />
        </footer>
      </Reveal>
    </section>
  );
}
