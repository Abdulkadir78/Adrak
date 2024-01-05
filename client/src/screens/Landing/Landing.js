import Container from "@mui/material/Container";
import { animated, useInView } from "@react-spring/web";

import ScrollToTopBtn from "../../components/Miscellanous/ScrollToTopBtn";
import VisualizeSection from "../../components/Landing/VisualizeSection";
import CollabSection from "../../components/Landing/CollabSection";
import Navbar from "../../components/Navigation/Navbar/Navbar";
import Footer from "../../components/Landing/Footer";
import Hero from "../../components/Landing/Hero";

function Landing() {
  const [ref, springs] = useInView(
    () => ({ from: { opacity: 0 }, to: { opacity: 1 } }),
    { once: true }
  );

  const [ref2, springs2] = useInView(
    () => ({ from: { y: 150 }, to: { y: 0 } }),
    { once: true }
  );

  const [ref3, springs3] = useInView(
    () => ({ from: { y: 150 }, to: { y: 0 } }),
    { once: true }
  );

  return (
    <>
      <Navbar />
      <Container>
        <animated.div ref={ref} style={springs}>
          <Hero />
        </animated.div>

        <animated.div ref={ref2} style={springs2}>
          <CollabSection />
        </animated.div>

        <animated.div ref={ref3} style={springs3}>
          <VisualizeSection />
        </animated.div>
      </Container>

      <Footer />
      <ScrollToTopBtn />
    </>
  );
}

export default Landing;
