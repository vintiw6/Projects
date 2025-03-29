import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <br />
      <HomeMenu />
      <section className="text-center my-8" id="contact">
        <div className="max-w-screen mx-auto px-8 md:px-10">
          <SectionHeaders
            subHeader={'Don\'t Hesitate'}
            mainHeader={'Contact us'}
          />
        </div>
        <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +65 1234 5678
          </a>
        </div>
      </section>
    </>
  );
}
