import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function ProjectsPage() {
    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 text-center mb-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Work</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Check out some of our recent projects.
                </p>
            </div>
            <Projects />
            <Contact />
        </div>
    );
}
