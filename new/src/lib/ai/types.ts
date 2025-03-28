// Types for chat messages
export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  content: string;
  role: Role;
  createdAt: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
  createdAt: Date;
}

// Types for AI mentors
export type MentorSpecialty = 
  | 'software_development' 
  | 'data_science' 
  | 'ux_design' 
  | 'digital_marketing' 
  | 'product_management' 
  | 'blockchain' 
  | 'career_guidance';

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  specialty: MentorSpecialty;
  description: string;
  systemPrompt: string;
}

// Types for AI responses
export interface AIResponse {
  id: string;
  message: string;
  createdAt: Date;
} 