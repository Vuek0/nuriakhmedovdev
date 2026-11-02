import Link from "next/link";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import { SectionIntro } from "@/components/Blocks";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <SectionIntro title="Page not found" eyebrow="404" className="intro--page">
        There’s nothing at this address.{" "}
        <Link href="/" className="link">
          Back to the home page ↗
        </Link>
      </SectionIntro>
      <Footer />
    </>
  );
}
