import Image from "next/image";
import PosterCarousel from "./PosterCarousel";
import { BASE_PATH } from "@/lib/base-path";
import MiniStars from "./MiniStars";
import Reveal from "./Reveal";
import ScrollToTopArrow from "./ScrollToTopArrow";
import SwatchTile from "./SwatchTile";

// A grid of boxes separated by black lines, laid out like the slide reference.
// Each box is placed by an ag-* class in globals.css.
export default function About() {
  return (
    <section className="panel about-panel" id="about">
      <Reveal>
        <div className="about-grid">
          <SwatchTile start="#e31f24" className="swatch ag-top-red" />
          <div className="cell ag-top" data-reveal />

          <SwatchTile start="#0765a7" className="swatch ag-left-blue" />
          <div className="cell ag-left-top" data-reveal />
          <div className="cell ag-photo" data-reveal>
            <Image
              src={`${BASE_PATH}/face.jpg`}
              alt="Photo of Caitlin Box"
              width={180}
              height={180}
              unoptimized
              className="photo"
            />
          </div>
          <div className="cell ag-gutter" data-reveal />

          <div className="cell ag-text" data-reveal>
            <h2 className="about-title">About me</h2>
            <MiniStars />
            <div className="about-text">
              <p>
                I’m a recent graduate from UCF where I obtained my bachelor’s in Computer Science and History! Within
                tech, I like to work with people and create solutions for the customer so they are able to understand
                and use the product to the full extent :)
              </p>
              <p>
                My current goal is to work as a Forward Deployed Engineer where I can combine both of my passions of
                helping others and coding! I’m always open to chat, contact me{" "}
                <a href="mailto:caitlinboxw@gmail.com">here</a>
              </p>
            </div>
          </div>

          <div className="cell ag-right-top" data-reveal />
          <div className="ag-right-stack">
            <SwatchTile start="#0765a7" className="swatch" />
            <SwatchTile start="#e31f24" className="swatch" />
          </div>

          <div className="ag-movies" data-reveal>
            <div className="movies-box">
              <h3 className="movies-title">My favorite movies!</h3>
              <PosterCarousel />
            </div>
          </div>

          <SwatchTile start="#fcea0c" className="swatch ag-bottom-yellow" />
          <div className="cell ag-bottom" data-reveal />
          <div className="ag-bottom-black" />
          <div className="cell ag-bottom-corner" data-reveal>
            <ScrollToTopArrow />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
