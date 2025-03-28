import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserTypePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500"></div>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            How do you want to use MentorNet?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Select your primary role to personalize your experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Card */}
          <Card className="hover:shadow-lg transition-all border-2 border-transparent hover:border-student cursor-pointer">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 10v5" />
                  <path d="M9 13h6" />
                  <path d="m9 6 3-3 3 3" />
                  <path d="M9 6h6" />
                  <path d="M9 18h6" />
                </svg>
              </div>
              <CardTitle className="student-gradient">I'm a Student</CardTitle>
              <CardDescription>
                I want to learn and develop my career
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 mb-6 text-left mx-auto max-w-xs">
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-student mr-2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Get AI-powered career guidance</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-student mr-2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Earn blockchain-verified skills</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-student mr-2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Build portfolio through real projects</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-student mr-2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Connect with industry mentors</span>
                </li>
              </ul>
              <Link href="/auth/signup?type=student">
                <Button variant="student" className="w-full">
                  Continue as Student
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Mentor Card */}
          <Card className="hover:shadow-lg transition-all border-2 border-transparent hover:border-mentor cursor-pointer">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
                  <path d="M17 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
                  <path d="M12 3v3" />
                  <path d="M12 15v3" />
                  <path d="M8 21h8" />
                  <path d="M7 10h10" />
                  <path d="M10 13v-1.1a1.1 1.1 0 0 1 2.2 0V13a3 3 0 0 1-2.2 2.9" />
                </svg>
              </div>
              <CardTitle className="mentor-gradient">I'm a Mentor</CardTitle>
              <CardDescription>
                I want to guide and support others
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 mb-6 text-left mx-auto max-w-xs">
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-mentor mr-2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Share your expertise with students</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-mentor mr-2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Earn MENT tokens for contributions</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-mentor mr-2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Build reputation in the Mentor DAO</span>
                </li>
                <li className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-mentor mr-2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Review and certify student skills</span>
                </li>
              </ul>
              <Link href="/auth/signup?type=mentor">
                <Button variant="mentor" className="w-full">
                  Continue as Mentor
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 