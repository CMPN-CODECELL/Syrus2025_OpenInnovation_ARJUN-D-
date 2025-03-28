"use client";

import { Badge } from "@/components/ui/badge";
import { MentorBadge } from "@/components/ui/mentor-badge";
import { MentorSpecialty } from "@/lib/ai/types";

export default function TestBadgePage() {
  // Array of all mentor specialties to test
  const specialties: MentorSpecialty[] = [
    'software_development',
    'data_science',
    'ux_design',
    'digital_marketing',
    'product_management',
    'blockchain',
    'career_guidance'
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Badge Component Test</h1>
      
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Default Variants</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Default Badge</Badge>
            <Badge variant="secondary">Secondary Badge</Badge>
            <Badge variant="destructive">Destructive Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
            <Badge variant="success">Success Badge</Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-medium">With Custom Classes</h2>
          <div className="flex flex-wrap gap-2">
            <Badge className="px-4 py-1">Larger Padding</Badge>
            <Badge className="text-sm">Larger Text</Badge>
            <Badge className="rounded-md">Rounded</Badge>
            <Badge className="font-bold">Bold Text</Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Interactive Example</h2>
          <div className="flex flex-wrap gap-2">
            <Badge className="cursor-pointer hover:scale-105 transition-transform">
              Hover Me
            </Badge>
            <Badge 
              variant="secondary" 
              className="cursor-pointer"
              onClick={() => alert('Badge clicked!')}
            >
              Click Me
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium">Mentor Specialty Badges</h2>
          <div className="flex flex-wrap gap-2">
            {specialties.map(specialty => (
              <MentorBadge 
                key={specialty} 
                specialty={specialty} 
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium">Custom Styled Mentor Badges</h2>
          <div className="flex flex-wrap gap-2">
            <MentorBadge 
              specialty="software_development" 
              className="px-4 py-1 text-sm"
            />
            <MentorBadge 
              specialty="data_science" 
              className="rounded-md font-bold"
            />
            <MentorBadge 
              specialty="blockchain" 
              className="animate-pulse"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 