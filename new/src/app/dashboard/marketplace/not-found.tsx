import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MentorNotFound() {
  return (
    <div className="container py-12">
      <div className="mb-6">
        <Link href="/dashboard/marketplace" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </div>
      
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>Mentor Not Found</CardTitle>
          <CardDescription>
            We couldn't find the mentor you're looking for. They may not be available or the profile doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>
            Try browsing our marketplace for other mentors who might be able to help with your specific needs.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/dashboard/marketplace">
              Browse Mentors
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 