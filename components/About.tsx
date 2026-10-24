import ColorTile from "./ColorTile";
import PosterCarousel from "./PosterCarousel";
import Reveal from "./Reveal";

// 3 rows x 2 columns. Cells go in DOM order, so row 1 is text | tile,
// row 2 is tile | text, and row 3 is text | tile.
export default function About() {
  return (
    <section className="panel about-panel" id="about">
      <Reveal>
        <div className="about-grid">
          <div className="cell cell-intro" data-reveal>
            <h2 className="about-title">About</h2>
            <div className="intro-middle">
              <div className="intro-top">
                <p>UCF Alum</p>
                <p>B.S. in Computer Science &amp; B.A. in History</p>
              </div>
              <p className="intro-bottom">
                Solutions focused &amp;
                <br />
                Client Obsessed
              </p>
            </div>
          </div>

          <div className="cell cell-tile" data-reveal>
            <ColorTile orientation="tl-br" starts={["#e31f24", "#256743"]} />
          </div>

          <div className="cell cell-tile" data-reveal>
            <ColorTile orientation="bl-tr" starts={["#262f71", "#fcea0c"]} />
          </div>

          <div className="cell cell-text" data-reveal>
            <p className="driven">
              Driven to build complex, high-impact software while working directly alongside partners and clients
              to solve their toughest technical problems.
            </p>
          </div>

          <div className="cell cell-movies" data-reveal>
            <p className="cell-heading">Outside of work</p>
            <div className="cell-sub">
              <p>
                Running and movie lover!
                <br />
                <span className="no-wrap">Here’s my favorite films</span>
              </p>
            </div>
            <PosterCarousel />
          </div>

          <div className="cell cell-tile" data-reveal>
            <ColorTile orientation="tl-br" starts={["#e62770", "#0765a7"]} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
