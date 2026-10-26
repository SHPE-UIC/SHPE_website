import { FaInstagram } from 'react-icons/fa6'
import './Awards.css'

export default function Awards() {
  return (
    <main className="awards">
      <section className="awards-hero section-dark">
        <div className="section-center awards-hero-inner">
          <h1>Highlights</h1>
          <p>Celebrating our members&rsquo; accomplishments, on and off campus.</p>
        </div>
      </section>

      <section className="awards-section section-center">
        <div className="awards-pending">
          <h2 className="awards-pending-heading">We Have Wins to Show</h2>
          <p>
            Gold Chapter recognition, a first-place finish at the SHPE National Academic
            Olympiad, SHPE Familia Award, and more! We&rsquo;re rebuilding
            this page to showcase them properly, so check back soon!
          </p>
          <a
            className="btn btn-primary awards-pending-button"
            href="https://www.instagram.com/shpeatuic/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram aria-hidden="true" />
            Follow us for updates
          </a>
        </div>
      </section>
    </main>
  )
}
