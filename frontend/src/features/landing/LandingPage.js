import Features from './Features';
import ImageBlurb from './ImageBlurb';
import LandingHero from './LandingHero';
import Testimonials from './Testimonials';
import ThreeColumnBlurb from './ThreeColumnBlurb';
import { Fade } from 'react-awesome-reveal';
import React from 'react';

export default function Landing() {
  return (
    <div>
      <LandingHero />
      <ThreeColumnBlurb />
      <Features />
      <Testimonials />
      <Fade>
        <ImageBlurb />
      </Fade>
    </div>
  );
}
