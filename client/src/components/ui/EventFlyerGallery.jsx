import { useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6'
import './EventFlyerGallery.css'

function FlyerLightbox({ events, selectedIndex, onClose, onSelectIndex }) {
  const closeButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const selectedIndexRef = useRef(selectedIndex)

  useEffect(() => {
    selectedIndexRef.current = selectedIndex
  }, [selectedIndex])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowLeft' && events.length > 1) {
        event.preventDefault()
        onSelectIndex(Math.max(0, selectedIndexRef.current - 1))
      } else if (event.key === 'ArrowRight' && events.length > 1) {
        event.preventDefault()
        onSelectIndex(Math.min(events.length - 1, selectedIndexRef.current + 1))
      } else if (event.key === 'Tab') {
        const buttons = dialogRef.current?.querySelectorAll('button:not(:disabled)')
        if (!buttons?.length) return

        const firstButton = buttons[0]
        const lastButton = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === firstButton) {
          event.preventDefault()
          lastButton.focus()
        } else if (!event.shiftKey && document.activeElement === lastButton) {
          event.preventDefault()
          firstButton.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [events.length, onClose, onSelectIndex])

  const event = events[selectedIndex]
  if (!event?.flyer) return null

  return (
    <div
      className="event-flyer-lightbox"
      onClick={(clickEvent) => {
        if (clickEvent.target === clickEvent.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="event-flyer-lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Event flyer"
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
          className="event-flyer-lightbox-close"
          type="button"
          aria-label="Close flyer"
          onClick={onClose}
        >
          <FaXmark aria-hidden="true" />
        </button>

        {events.length > 1 && (
          <>
            <button
              className="event-flyer-lightbox-arrow event-flyer-lightbox-previous"
              type="button"
              aria-label="Previous flyer"
              disabled={selectedIndex === 0}
              onClick={() => onSelectIndex(selectedIndex - 1)}
            >
              <FaChevronLeft aria-hidden="true" />
            </button>
            <button
              className="event-flyer-lightbox-arrow event-flyer-lightbox-next"
              type="button"
              aria-label="Next flyer"
              disabled={selectedIndex === events.length - 1}
              onClick={() => onSelectIndex(selectedIndex + 1)}
            >
              <FaChevronRight aria-hidden="true" />
            </button>
          </>
        )}

        <img className="event-flyer-lightbox-image" src={event.flyer} alt={`${event.title} flyer`} />
      </div>
    </div>
  )
}

export default function EventFlyerGallery({ events, className, children }) {
  const [selectedEventId, setSelectedEventId] = useState(null)
  const eventsRef = useRef(events)
  const selectedIndex = events.findIndex((event) => event.id === selectedEventId)

  useEffect(() => {
    eventsRef.current = events
  }, [events])

  const closeViewer = useCallback(() => setSelectedEventId(null), [])
  const selectEventAtIndex = useCallback((index) => {
    setSelectedEventId(eventsRef.current[index]?.id ?? null)
  }, [])

  return (
    <>
      <div className={className}>
        {events.map((event) =>
          children(event, () => setSelectedEventId(event.id))
        )}
      </div>
      {selectedIndex >= 0 && (
        <FlyerLightbox
          events={events}
          selectedIndex={selectedIndex}
          onClose={closeViewer}
          onSelectIndex={selectEventAtIndex}
        />
      )}
    </>
  )
}
