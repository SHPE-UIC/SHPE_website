import EventFlyerGallery from '../components/ui/EventFlyerGallery'
import useEventGroups from '../hooks/useEventGroups'
import './PastEvents.css'

function PastEventCard({ event, onOpenFlyer }) {
  return (
    <article className="past-event-card">
      {event.flyer ? (
        <button
          className="event-flyer-trigger"
          type="button"
          aria-label={`Enlarge flyer: ${event.title}`}
          aria-haspopup="dialog"
          onClick={onOpenFlyer}
        >
          <img className="past-event-flyer" src={event.flyer} alt="" loading="lazy" />
        </button>
      ) : (
        <div className="past-event-placeholder">FLYER PLACEHOLDER</div>
      )}

      <div className="past-event-details">
        <h2>{event.title}</h2>
      </div>

      {event.photos?.length > 0 && (
        <div className="past-event-photos" aria-label={`${event.title} photos`}>
          {event.photos.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              alt={`${event.title}, photo ${index + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      )}
    </article>
  )
}

export default function PastEvents() {
  const { past } = useEventGroups()

  return (
    <main className="past-events-page">
      <section className="past-events-hero section-dark">
        <div className="section-center past-events-hero-inner">
          <h1>Past Events</h1>
          <p>Take a look back at events hosted by SHPE at UIC.</p>
        </div>
      </section>

      <section className="section-center past-events-section">
        {past.length > 0 ? (
          <EventFlyerGallery events={past} className="past-events-list">
            {(event, onOpenFlyer) => (
              <PastEventCard
                key={event.id}
                event={event}
                onOpenFlyer={onOpenFlyer}
              />
            )}
          </EventFlyerGallery>
        ) : (
          <p className="past-events-empty">Past events will be added here soon.</p>
        )}
      </section>
    </main>
  )
}