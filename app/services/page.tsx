import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export default function ServicesPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 text-center mb-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    We offer a wide range of digital solutions to help your business grow.
                </p>
            </div>
            <Services />
            <Contact />
        </div>
    );
}
