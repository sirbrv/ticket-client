import React from "react";
import { SlSocialInstagram } from "react-icons/sl";
import { ImWhatsapp } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PiMapPinLine } from "react-icons/pi";
import "./footer.css";

export default function Footer() {
  return (
    <>
      <footer>
        <section className="ticketFooter">
          <div className="ubicacion">
            <h4>Puntos de Contactos</h4>
            {/* <h5 className="linea">____________</h5> */}
            <div className="place">
              <PiMapPinLine className="icon-color-ub" size="28px" />
              <p className="encuentrano">
                <span>
                  Primer piso, Sindhu Center, Moon Market, cerca del restaurante
                  Bundu Khan, Allama Iqbal Town, Lahore
                </span>
              </p>
            </div>

            <p className="phone">
              <BsTelephone className="icon-color-ub" size="18px" />
              +598 543234543
            </p>
            <p className="correo">
              <MdOutlineMarkEmailRead className="icon-color-ub" size="18px" />
              info@academy.com
            </p>
          </div>
          <div className="about">
            <h4>About</h4>
            {/* <h5 className="linea">_____________</h5> */}
            <p>
              Estamos aquí para la comunidad. La misión es hacer que la
              educación de calidad sea asequible y accesible para todos en esta
              región. Es por eso que IT Academy ofrece una variedad de programas
              de TI a costos razonables para los estudiantes.
            </p>
          </div>
          <div className="ubicanos">
            <h4>Redes Sociales</h4>
            {/* <h5 className="linea">_________________</h5> */}
            <h6>
              <ImWhatsapp className="icon-color" /> WhatSapp
            </h6>
            <h6>
              <SlSocialInstagram className="icon-color" /> Instagram
            </h6>
            <h6>
              <TfiEmail className="icon-color" /> Correo Electrónico
            </h6>
          </div>
        </section>
        <section className="footer-footer">
          <p>
            Copyright 2024 - LIPSTICK DANCE CREW - Todos los derechos
            reservados.
          </p>
        </section>
      </footer>
    </>
  );
}
