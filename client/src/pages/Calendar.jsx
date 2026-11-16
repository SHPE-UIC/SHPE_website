import { useEffect, useState } from 'react'
import { FaInstagram } from 'react-icons/fa6'
import EventFlyerGallery from '../components/ui/EventFlyerGallery'
import { formatEventDate } from '../data/events'
import useEventGroups from '../hooks/useEventGroups'
import './Calendar.css'

const CALENDAR_ID =
  'NTE4MWNkNjk1ZGFhY2RhMTk1NDE5ZjU0OTQzMjg5ZDgwODMwZjJkZjFkYzk5MmU2MTRhMzBjOGEzNGNlZTE0N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t'
const MOBILE_QUERY = '(max-width: 640px)'

function embedUrl(mode) {
  return `https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&title=SHPE%20%40%20UIC&src=NTE4MWNkNjk1ZGFhY2RhMTk1NDE5ZjU0OTQzMjg5ZDgwODMwZjJkZjFkYzk5MmU2MTRhMzBjOGEzNGNlZTE0N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23f4511e`
}

function EventFlyerCard({ event, onOpenFlyer }) {
  return (
    <article className="calendar-event-card">
      {event.flyer ? (
        <button
          className="event-flyer-trigger"
          type="button"
          aria-label={`Enlarge flyer: ${event.title}`}
          aria-haspopup="dialog"
          onClick={onOpenFlyer}
        >
          <img
            className="calendar-event-flyer"
            src={event.flyer}
            alt=""
            loading="lazy"
          />
        </button>
      ) : (
        <div className="calendar-event-placeholder">
          <strong>FLYER PLACEHOLDER</strong>
        </div>
      )}

      <div className="calendar-event-details">
        <h3>{event.title}</h3>
        <p><strong>Date:</strong> {formatEventDate(event.date)}</p>
        {event.time && <p><strong>Time:</strong> {event.time}</p>}
        {event.place && <p><strong>Place:</strong> {event.place}</p>}
        {event.notes && <p>{event.notes}</p>}
      </div>
    </article>
  )
}

function CalendarEventSection({ heading, events }) {
  return (
    <section className="calendar-events-group" aria-labelledby={`${heading}-heading`}>
      <h2 id={`${heading}-heading`}>{heading}</h2>
      <EventFlyerGallery events={events} className="calendar-events-grid">
        {(event, onOpenFlyer) => (
          <EventFlyerCard key={event.id} event={event} onOpenFlyer={onOpenFlyer} />
        )}
      </EventFlyerGallery>
    </section>
  )
}

export default function Calendar() {
  const { today, comingUp } = useEventGroups()
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  )

  // Google's month grid is unreadable on phones, so fall back to the agenda list
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const handleChange = (event) => setIsMobile(event.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  return (
    <main className="calendar-page">
      <section className="calendar-hero section-dark">
        <div className="section-center calendar-hero-inner">
          <h1>Calendar</h1>
          <p>All of our upcoming events, in one place.</p>
        </div>
      </section>

      <section className="calendar-section section-center">
        <div className="calendar-embed">
          <iframe
            src={embedUrl(isMobile ? 'AGENDA' : 'MONTH')}
            title="SHPE at UIC events calendar"
            className="calendar-embed-frame"
            loading="lazy"
          />
        </div>
        <div className="calendar-instagram-wrap">
          <a
            className="btn btn-primary calendar-instagram"
            href="https://www.instagram.com/shpeatuic/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram aria-hidden="true" />
            Want more information? Follow us on Instagram!
          </a>
        </div>

        <CalendarEventSection heading="TODAY" events={today} />
        <CalendarEventSection heading="COMING UP" events={comingUp} />
      </section>
    </main>
  )
}
