import { useEffect, useRef } from "react"
import Card from "react-bootstrap/Card"
import "/src/css/Mindly.css"
import "/src/css/Recensioni.css"
import { Container } from "react-bootstrap"

const recensioni = [
  {
    nome: "Angela M.",
    titolo: "Introspezione necessaria",
    testo:
      "Mi ha aiutato a osservare le cose da un punto di vista diverso. Esperienza utile e rassicurante.",
  },
  {
    nome: "Mario R.",
    titolo: "Ottimo servizio",
    testo:
      "Terapista competente e accogliente. Mi sono sentito ascoltato fin da subito.",
  },
  {
    nome: "Desirée L.",
    titolo: "Soddisfatta",
    testo: "Felice della mia scelta. Un servizio semplice, chiaro e efficace.",
  },
  {
    nome: "Salvatore T.",
    titolo: "Esperienza positiva",
    testo:
      "Professionisti gentili e preparati. Ottima impressione fin dal primo colloquio.",
  },
  {
    nome: "Angela M.",
    titolo: "Introspezione necessaria",
    testo:
      "Mi ha aiutato a osservare le cose da un punto di vista diverso. Esperienza utile e rassicurante.",
  },
  {
    nome: "Mario R.",
    titolo: "Ottimo servizio",
    testo:
      "Terapista competente e accogliente. Mi sono sentito ascoltato fin da subito.",
  },
  {
    nome: "Desirée L.",
    titolo: "Soddisfatta",
    testo: "Felice della mia scelta. Un servizio semplice, chiaro e efficace.",
  },
  {
    nome: "Salvatore T.",
    titolo: "Esperienza positiva",
    testo:
      "Professionisti gentili e preparati. Ottima impressione fin dal primo colloquio.",
  },
  {
    nome: "Giorgia V.",
    titolo: "Supporto fondamentale",
    testo:
      "Grazie alla psicologa sto affrontando meglio momenti difficili. Consiglio vivamente!",
  },
]

const Recensioni = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let giu = false
    let sinistra: number
    let scroolSinistra: number

    const handleMouseDown = (e: { pageX: number }) => {
      giu = true
      sinistra = e.pageX - container.offsetLeft
      scroolSinistra = container.scrollLeft
    }

    const handleMouseLeave = () => (giu = false)
    const handleMouseUp = () => (giu = false)

    const handleMouseMove = (e: {
      preventDefault: () => void
      pageX: number
    }) => {
      if (!giu) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - sinistra) * 2
      container.scrollLeft = scroolSinistra - walk
    }

    container.addEventListener("mousedown", handleMouseDown)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("mouseup", handleMouseUp)
    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousedown", handleMouseDown)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("mouseup", handleMouseUp)
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Cosa dicono di noi</h2>
          <p className="text-muted">
            Alcune testimonianze ispirate a recensioni reali
          </p>
        </div>
        <div
          className="scroll-container d-flex gap-4 overflow-auto px-2 pb-3"
          ref={containerRef}
        >
          {recensioni.map((r, i) => (
            <Card key={i} className="min-card flex-shrink-0 shadow-sm">
              <Card.Body>
                <div className="stars mb-2">{"★★★★★"}</div>
                <Card.Title className="fw-semibold">{r.titolo}</Card.Title>
                <Card.Text>{r.testo}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted small">
                {r.nome} • Recensione mockup
              </Card.Footer>
            </Card>
          ))}
        </div>
        <div className="text-center mt-4">
          <img
            src="/img/Trustpilot_new_logo.png"
            alt="Trustpilot Logo"
            style={{ height: "30px" }}
          />
          <p className="text-muted small mt-2">
            *Le recensioni mostrate sono esempi a fini di mockup, alcune create
            con l'AI, alcune prese direttamente dalla pagina TrustPilot di
            UnoBravo.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default Recensioni
