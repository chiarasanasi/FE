import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBarClientePsico from "../../component/NavbarClientePsico"
import SidebarCliente from "../../component/Sidebar"
import WelcomeUtente from "../../component/homecliente/WelcomeUtente"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import MiniDiario from "../../component/homecliente/MiniDiario"
import Calendario from "../../component/homecliente/Calendario"
import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import "/src/css/Mindly.css"
import "/src/css/Calendario.css"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"

export interface Nota {
  id: number
  titolo: string
  contenuto: string
  dataCreazione: string
}

const HomeCliente = () => {
  interface DecodedToken {
    username: string
  }

  const token = localStorage.getItem("token")
  let username = ""

  if (token) {
    const decoded: DecodedToken = jwtDecode(token)
    username = decoded.username
  }

  const [cliente, setCliente] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState<Nota[]>([])
  void note
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    const fetchCliente = async () => {
      try {
        const res = await fetchTokenScaduto(
          `${import.meta.env.VITE_BACKEND_URL}/cliente/me`,
          {}
        )
        const data = await res.json()
        setCliente(data)
        // console.log("CLIENTE", cliente)
      } catch (err) {
        console.error("Errore cliente:", err)
      } finally {
        setLoading(false)
      }
    }

    const fetchNote = async () => {
      try {
        const res = await fetchTokenScaduto(
          `${import.meta.env.VITE_BACKEND_URL}/note`,
          {}
        )
        if (res.ok) {
          const data = await res.json()
          setNote(data)
        }
      } catch (err) {
        console.error("Errore note:", err)
      }
    }

    fetchCliente(), fetchNote()
  }, [navigate])

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <Spinner animation="border" variant="success" role="status"></Spinner>
        <span>Caricamento...</span>
      </div>
    )
  }

  if (!cliente?.psicologo) {
    if (!localStorage.getItem("token")) {
      return null
    }

    return (
      <p className="text-center">
        Non riusciamo a raggiungere il tuo psicologo.
      </p>
    )
  }

  return (
    <>
      <NavBarClientePsico />

      <SidebarCliente />
      <Container>
        <Row className="justify-content-center">
          <Col lg={12}>
            <WelcomeUtente cliente={cliente} />
          </Col>
        </Row>
        <Row>
          <Col lg={6} className="g-4 ">
            <Link
              className="linkcollegamento"
              to={`/cliente/${username}/calendario`}
            >
              Calendario &gt;{" "}
            </Link>
            <Calendario />
          </Col>
          <Col lg={6} className="g-4">
            <Link
              className="linkcollegamento"
              to={`/cliente/${username}/diario`}
            >
              Diario &gt;{" "}
            </Link>
            <MiniDiario />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeCliente
