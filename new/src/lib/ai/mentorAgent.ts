/**
 * MentorAgent.ts
 * 
 * This file defines the AI Mentor Agent class that uses Deepseek and Gemini 2.0 Flash
 * for providing AI-powered mentorship in MentorNet.
 */

export type MentorType = 'career' | 'technical' | 'interview' | 'resume';

export type MentorResponse = {
  text: string;
  sources?: Array<{
    title: string;
    url: string;
  }>;
  actionItems?: string[];
};

export interface IMentorAgent {
  sendMessage(message: string): Promise<MentorResponse>;
  getHistory(): Promise<Array<{role: 'user' | 'assistant', content: string}>>;
  clearContext(): Promise<void>;
  getMentorType(): MentorType;
}

/**
 * MentorAgent class that implements the different AI mentor types
 * using Deepseek and Gemini 2.0 Flash
 */
export class MentorAgent implements IMentorAgent {
  private mentorType: MentorType;
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = [];
  private useDeepseek: boolean = true; // Toggle between Deepseek and Gemini

  /**
   * Initialize a new mentor agent of the specified type
   */
  constructor(mentorType: MentorType) {
    this.mentorType = mentorType;
  }

  /**
   * Get the agent's mentor type
   */
  getMentorType(): MentorType {
    return this.mentorType;
  }

  /**
   * Send a message to the AI mentor and get a response
   */
  async sendMessage(message: string): Promise<MentorResponse> {
    // Add the user message to history
    this.conversationHistory.push({
      role: 'user',
      content: message
    });

    // Select the appropriate AI model based on the flag
    const response = this.useDeepseek 
      ? await this.callDeepseekAPI(message) 
      : await this.callGeminiAPI(message);
    
    // Add the assistant's response to history
    this.conversationHistory.push({
      role: 'assistant',
      content: response.text
    });

    return response;
  }

  /**
   * Get the conversation history
   */
  async getHistory(): Promise<Array<{role: 'user' | 'assistant', content: string}>> {
    return [...this.conversationHistory];
  }

  /**
   * Clear the conversation context
   */
  async clearContext(): Promise<void> {
    this.conversationHistory = [];
  }

  /**
   * Toggle between Deepseek and Gemini models
   */
  toggleModel(useDeepseek: boolean): void {
    this.useDeepseek = useDeepseek;
  }

  /**
   * Call the Deepseek API with the current conversation context
   * @private
   */
  private async callDeepseekAPI(message: string): Promise<MentorResponse> {
    // TODO: Implement actual Deepseek API integration
    console.log('Calling Deepseek API for mentor type:', this.mentorType);
    
    // For now, return a mock response
    return this.getMockResponse(message);
  }

  /**
   * Call the Gemini 2.0 Flash API with the current conversation context
   * @private
   */
  private async callGeminiAPI(message: string): Promise<MentorResponse> {
    // TODO: Implement actual Gemini API integration
    console.log('Calling Gemini 2.0 Flash API for mentor type:', this.mentorType);
    
    // For now, return a mock response
    return this.getMockResponse(message);
  }

  /**
   * Get a mock response for development purposes
   * @private
   */
  private getMockResponse(message: string): MentorResponse {
    const responses: Record<MentorType, MentorResponse> = {
      career: {
        text: `As your Career Guide AI mentor, I've analyzed your question about "${message.substring(0, 30)}...". Based on current industry trends, I recommend focusing on building a strong portfolio of projects that demonstrate your skills. Would you like me to suggest some specific project ideas for your field?`,
        actionItems: [
          'Update your LinkedIn profile with your new skills',
          'Join relevant industry communities on Discord or Slack',
          'Start a small portfolio project to demonstrate your expertise'
        ]
      },
      technical: {
        text: `From a technical perspective, your question about "${message.substring(0, 30)}..." involves several concepts. Let me break this down step by step and explain the underlying principles with code examples.`,
        sources: [
          { title: 'Modern JS Patterns', url: 'https://example.com/js-patterns' },
          { title: 'System Design Principles', url: 'https://example.com/system-design' }
        ]
      },
      interview: {
        text: `Great question about interview preparation. When you're asked about "${message.substring(0, 30)}..." in an interview, it's important to structure your answer using the STAR method: Situation, Task, Action, Result. Let me show you an example relevant to your background.`,
        actionItems: [
          'Practice this answer out loud 3-5 times',
          'Prepare 2-3 variations for different contexts',
          'Research how this topic applies at your target companies'
        ]
      },
      resume: {
        text: `I've reviewed your resume question about "${message.substring(0, 30)}...". To maximize impact, I suggest highlighting your quantifiable achievements rather than just listing responsibilities. For example, "Increased site performance by 40%" is more impactful than "Responsible for site performance".`,
        actionItems: [
          "Remove generic skills that don't differentiate you",
          'Add metrics to at least 3 of your bullet points',
          'Customize your resume for each specific job application'
        ]
      }
    };

    return responses[this.mentorType];
  }
} 