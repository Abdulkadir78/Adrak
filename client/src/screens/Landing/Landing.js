import Container from "@mui/material/Container";
import Fade from "react-reveal/Fade";

import ScrollToTopBtn from "../../components/Miscellanous/ScrollToTopBtn";
import VisualizeSection from "../../components/Landing/VisualizeSection";
import CollabSection from "../../components/Landing/CollabSection";
import Navbar from "../../components/Navigation/Navbar/Navbar";
import Footer from "../../components/Landing/Footer";
import Hero from "../../components/Landing/Hero";

function Landing() {
  return (
    <>
      <Navbar />
      <Container>
        <Fade>
          <Hero />
        </Fade>

        <Fade bottom>
          <CollabSection />
          <VisualizeSection />
        </Fade>
      </Container>

      <Footer />
      <ScrollToTopBtn />
    </>
  );
}

export default Landing;
