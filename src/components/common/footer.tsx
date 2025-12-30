const Footer = () => {
  return (
    <div className="bg-accent w-full gap-1 p-8">
      <p className="text-xs font-medium">© 2025 Copyright RESTAURANT</p>
      <p className="text-muted-foreground text-xs font-medium">
        entre em contato para garantir seu cardápio digital personalizado!
      </p>
      <p>
        telefoene:{" "}
        <a href="https://wa.me/5531995259313?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20ter%20meu%20card%C3%A1pio%20digital.">
          (31) 95259313
        </a>{" "}
        |{" "}
        <a href="mailto:guilhermebratiliere@gmail.com? assunto=CARD%C3%81PIO%20PERSONALIZADO&corpo=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20ter%20meu%20card%C3%A1pio%20digital.">
          email: guilhermebratiliere@gmail.com
        </a>
      </p>
    </div>
  );
};

export default Footer;
