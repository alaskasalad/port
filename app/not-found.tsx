import BauhausShapes from "@/components/BauhausShapes";
import { BASE_PATH } from "@/lib/base-path";

export default function NotFound() {
  return (
    <main className="frame">
      <section className="panel not-found">
        <h1 className="not-found-title">
          <a className="not-found-link" href={`${BASE_PATH}/`}>
            <span className="not-found-text">Not Found</span>
            <span className="not-found-text not-found-back">Back to the Portfolio</span>
          </a>
        </h1>
        <BauhausShapes />
      </section>
    </main>
  );
}
