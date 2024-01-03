import "./Footer.css";
import { AiOutlineInstagram } from "react-icons/ai";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Registro productos</h4>
            <ul>
              <li>
                <Link href="/products">Mis Productos</Link>
              </li>
              <li>
                <Link href="/categories">Mis Categorias</Link>
              </li>
            </ul>
          </div>
          {/* <div className="footer-col">
            <h4>Nuestras redes sociales</h4>
            <div className="social-links">
              <Link className="social-icons" href="#">
                <AiOutlineInstagram size={20} />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
      <div className="container-brand">
        <p>&copy; Registro productos</p>
      </div>
    </footer>
  );
};
