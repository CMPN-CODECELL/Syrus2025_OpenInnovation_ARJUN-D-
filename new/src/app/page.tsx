import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div>
          {/* Hero section */}
          <section className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-16">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Decentralized Mentorship Platform</h1>
                <p className="text-lg mb-6">
                  Connect with expert mentors, track your progress with blockchain-verified skills, and build a portfolio of real-world projects.
                </p>
                <div className="flex space-x-4">
                  <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                    <Link href="/dashboard">
                      Start Learning
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-emerald-600">
                    <Link href="/mentor-auth">
                      Become a Mentor
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md h-64 md:h-80">
                  <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl"></div>
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                    <span className="text-2xl font-bold">MentorNet Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                  <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 dark:bg-emerald-900">
                    <span className="text-emerald-600 text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Connect with Mentors</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Browse our marketplace of verified mentors and connect with industry experts who can guide your learning journey.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                  <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 dark:bg-emerald-900">
                    <span className="text-emerald-600 text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Complete Projects</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Work on real-world projects with your mentor, applying your skills to solve practical problems.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                  <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 dark:bg-emerald-900">
                    <span className="text-emerald-600 text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Earn Credentials</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Receive blockchain-verified credentials and build your professional portfolio with verified projects and skills.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to action */}
          <section className="bg-emerald-50 py-16 dark:bg-emerald-900">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Ready to start your learning journey?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto dark:text-gray-300">
                Join MentorNet today and connect with expert mentors who can help you achieve your learning goals.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                  <Link href="/dashboard">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
