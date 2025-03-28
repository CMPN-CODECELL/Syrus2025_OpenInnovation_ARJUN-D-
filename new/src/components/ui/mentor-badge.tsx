import { Badge, BadgeProps } from "@/components/ui/badge";
import { MentorSpecialty } from "@/lib/ai/types";

interface MentorBadgeProps extends Omit<BadgeProps, 'children'> {
  specialty: MentorSpecialty;
}

// Map specialties to badge variants and formatted display names
const specialtyConfig: Record<MentorSpecialty, {
  variant: BadgeProps['variant'];
  displayName: string;
}> = {
  software_development: {
    variant: 'default',
    displayName: 'Software Development'
  },
  data_science: {
    variant: 'secondary',
    displayName: 'Data Science'
  },
  ux_design: {
    variant: 'outline',
    displayName: 'UX Design'
  },
  digital_marketing: {
    variant: 'success',
    displayName: 'Digital Marketing'
  },
  product_management: {
    variant: 'default',
    displayName: 'Product Management'
  },
  blockchain: {
    variant: 'destructive',
    displayName: 'Blockchain'
  },
  career_guidance: {
    variant: 'secondary',
    displayName: 'Career Guidance'
  }
};

export function MentorBadge({ specialty, className, ...props }: MentorBadgeProps) {
  const config = specialtyConfig[specialty];
  
  return (
    <Badge 
      variant={config.variant} 
      className={className}
      {...props}
    >
      {config.displayName}
    </Badge>
  );
}

// Helper function to format specialty strings (for cases where MentorBadge isn't used)
export function formatSpecialty(specialty: string): string {
  return specialty
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
} 