import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, LockClosed } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the interface for the SkillData
export interface SkillData {
  id: string;
  name: string;
  category: string;
  level: number;
  verificationStatus: "verified" | "pending" | "unverified";
  transactionHash?: string;
  progress: number;
  description: string;
  verifiedDate?: Date;
}

export type SkillVerificationStatus = "verified" | "pending" | "unverified";

// Define variants for the SkillBadge component
export const skillBadgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        verified: "bg-green-100 text-green-800 hover:bg-green-200",
        pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        unverified: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      size: {
        default: "h-6",
        sm: "h-5 text-[10px]",
        lg: "h-7 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SkillBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skillBadgeVariants> {
  skill: SkillData;
  showVerification?: boolean;
  showLevel?: boolean;
}

export function SkillBadge({
  className,
  variant,
  size,
  skill,
  showVerification = true,
  showLevel = true,
  ...props
}: SkillBadgeProps) {
  // Determine the variant based on verification status if not specified
  const badgeVariant = variant || skill.verificationStatus;

  return (
    <div
      className={cn(
        skillBadgeVariants({ variant: badgeVariant, size }),
        className
      )}
      {...props}
    >
      <span className="mr-1">{skill.name}</span>
      
      {showLevel && (
        <span className="ml-1 rounded-full bg-black/10 px-1.5 text-[10px]">
          L{skill.level}
        </span>
      )}
      
      {showVerification && (
        <span className="ml-1.5 flex items-center">
          {skill.verificationStatus === "verified" && (
            <CheckCircle className="h-3 w-3 text-green-600" />
          )}
          {skill.verificationStatus === "pending" && (
            <Clock className="h-3 w-3 text-yellow-600" />
          )}
          {skill.verificationStatus === "unverified" && (
            <LockClosed className="h-3 w-3 text-gray-600" />
          )}
        </span>
      )}
    </div>
  );
}

export interface SkillBadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  skills: SkillData[];
  limit?: number;
  showAll?: boolean;
  badgeSize?: VariantProps<typeof skillBadgeVariants>["size"];
  showVerification?: boolean;
  showLevel?: boolean;
}

export function SkillBadgeGroup({
  className,
  skills,
  limit = 5,
  showAll = false,
  badgeSize,
  showVerification = true,
  showLevel = true,
  ...props
}: SkillBadgeGroupProps) {
  const displaySkills = showAll ? skills : skills.slice(0, limit);
  const remainingCount = skills.length - limit;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)} {...props}>
      {displaySkills.map((skill) => (
        <SkillBadge
          key={skill.id}
          skill={skill}
          size={badgeSize}
          showVerification={showVerification}
          showLevel={showLevel}
        />
      ))}
      
      {!showAll && remainingCount > 0 && (
        <Badge variant="outline" className="text-xs">
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
} 