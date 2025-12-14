import Hero from '@/components/Hero';
import SteelCollection from '@/components/SteelCollection';
import FeaturedProducts from '@/components/FeaturedProducts';
import About from '@/components/About';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="collections">
        <SteelCollection />
      </section>

      <section id="featured">
        <FeaturedProducts />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="newsletter">
        <Newsletter />
      </section>

      <Footer />
    </>
  );
}
