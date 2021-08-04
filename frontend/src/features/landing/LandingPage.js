import Navbar from '../../components/navbar';
import Features from './Features';
import ImageBlurb from './ImageBlurb';
import LandingHero from './LandingHero';
import Testimonials from './Testimonials';
import ThreeColumnBlurb from './ThreeColumnBlurb';
import Fade from 'react-reveal/Fade';

export default function Landing() {
  return (
    <div>
      <Navbar />
      <Fade up>
        <LandingHero />
      </Fade>
      <Fade up>
        <ThreeColumnBlurb />
      </Fade>
      <Fade up>
        <Features />
      </Fade>
      <Fade up>
        <Testimonials />
      </Fade>
      <Fade>
        <ImageBlurb />
      </Fade>
    </div>
  );
}
