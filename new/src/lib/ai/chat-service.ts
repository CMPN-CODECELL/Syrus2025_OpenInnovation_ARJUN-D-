import { v4 as uuidv4 } from 'uuid';
import type { Message, Role, ChatHistory, Mentor, MentorSpecialty, AIResponse } from './types';

// Simulate API response delay
const MOCK_API_DELAY = 1000;

/**
 * Create a new message
 */
export function createMessage(content: string, role: Role): Message {
  return {
    id: uuidv4(),
    content,
    role,
    createdAt: new Date(),
  };
}

/**
 * Create a new chat history for a specific mentor
 */
export function createChatHistory(mentor: Mentor): ChatHistory {
  const systemMessage = createMessage(
    `You are ${mentor.name}, a mentor specializing in ${mentor.specialty}. ${mentor.systemPrompt}`,
    'system'
  );

  const welcomeMessage = createMessage(
    getWelcomeMessage(mentor.specialty),
    'assistant'
  );

  return {
    id: uuidv4(),
    title: `Chat with ${mentor.name}`,
    messages: [systemMessage, welcomeMessage],
    updatedAt: new Date(),
    createdAt: new Date(),
  };
}

/**
 * Get a welcome message based on mentor specialty
 */
function getWelcomeMessage(specialty: MentorSpecialty): string {
  switch (specialty) {
    case 'software_development':
      return "Hi there! I'm excited to help you with your software development journey. Whether you're looking to improve your coding skills, start a new project, or solve a technical challenge, I'm here to guide you. What specific area of software development are you focusing on right now?";
    
    case 'data_science':
      return "Hello! I'm here to assist you with data science and machine learning. Whether you're exploring data analysis, building predictive models, or implementing AI solutions, I can provide guidance. What data science challenge are you currently working on?";
    
    case 'ux_design':
      return "Welcome! I'm here to help you with UX/UI design. Whether you're creating user interfaces, conducting user research, or improving your design workflow, I can provide insights and best practices. What design project are you currently working on?";
    
    case 'digital_marketing':
      return "Hello there! I'm here to help with your digital marketing needs. Whether you're developing a marketing strategy, optimizing campaigns, or analyzing performance metrics, I can provide guidance. What marketing challenge are you facing right now?";
    
    case 'product_management':
      return "Hi! I'm your product management mentor. Whether you're defining product requirements, creating roadmaps, or launching new features, I can help you navigate the product development lifecycle. What product challenge are you currently facing?";
    
    case 'blockchain':
      return "Welcome! I'm here to guide you through blockchain technology and web3 development. Whether you're building smart contracts, exploring decentralized applications, or learning about blockchain fundamentals, I can help. What specific area of blockchain are you interested in?";
    
    case 'career_guidance':
      return "Hello! I'm here to help with your career development in tech. Whether you're preparing for interviews, building your portfolio, or planning your career path, I can provide guidance based on industry experience. What career goals are you currently focused on?";
    
    default:
      return "Hello! I'm your AI mentor. How can I help you today?";
  }
}

/**
 * Send a message to the AI mentor and get a response
 */
export async function sendMessageToMentor(
  userMessage: string,
  chatHistory: ChatHistory
): Promise<ChatHistory> {
  // Create user message
  const message = createMessage(userMessage, 'user');
  
  // Add user message to history
  const updatedHistory: ChatHistory = {
    ...chatHistory,
    messages: [...chatHistory.messages, message],
    updatedAt: new Date(),
  };
  
  // Simulate AI response
  const aiResponse = await simulateAIResponse(userMessage, updatedHistory);
  
  // Add AI response to history
  return {
    ...updatedHistory,
    messages: [...updatedHistory.messages, aiResponse],
    updatedAt: new Date(),
  };
}

/**
 * Simulate an AI response
 */
async function simulateAIResponse(
  userMessage: string,
  chatHistory: ChatHistory
): Promise<Message> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  
  // Generate a response based on user message
  const response = generateMockResponse(userMessage.toLowerCase(), chatHistory);
  
  // Create AI message
  return createMessage(response, 'assistant');
}

/**
 * Generate a mock response based on keywords in the user message
 */
function generateMockResponse(userMessage: string, chatHistory: ChatHistory): string {
  // Get mentor specialty from system message
  const systemMessage = chatHistory.messages.find(msg => msg.role === 'system');
  let specialty: MentorSpecialty = 'career_guidance';
  
  if (systemMessage) {
    if (systemMessage.content.includes('software_development')) specialty = 'software_development';
    else if (systemMessage.content.includes('data_science')) specialty = 'data_science';
    else if (systemMessage.content.includes('ux_design')) specialty = 'ux_design';
    else if (systemMessage.content.includes('digital_marketing')) specialty = 'digital_marketing';
    else if (systemMessage.content.includes('product_management')) specialty = 'product_management';
    else if (systemMessage.content.includes('blockchain')) specialty = 'blockchain';
    else if (systemMessage.content.includes('career_guidance')) specialty = 'career_guidance';
  }
  
  // Check for greeting
  if (userMessage.match(/hello|hi|hey|greetings|good morning|good afternoon|good evening/i)) {
    return "Hello! It's great to connect with you. How can I help you with your career or learning goals today?";
  }
  
  // Check for resume related
  if (userMessage.includes('resume') || userMessage.includes('cv')) {
    return "Your resume is a critical tool in your job search. Make sure to highlight your achievements with quantifiable results, tailor it to each job application, and keep it concise (1-2 pages). Would you like specific advice on a particular section of your resume?";
  }
  
  // Check for interview related
  if (userMessage.includes('interview')) {
    return "Interviews can be challenging, but preparation is key. Research the company, practice common questions, prepare stories that demonstrate your skills, and have thoughtful questions ready. What specific aspect of interviewing would you like to work on?";
  }
  
  // Check for learning related
  if (userMessage.includes('learn') || userMessage.includes('course') || userMessage.includes('study')) {
    switch (specialty) {
      case 'software_development':
        return "Learning software development is a journey. I recommend starting with fundamentals like HTML, CSS, and JavaScript if you're interested in web development, or Python for a versatile language. Then build projects to apply what you've learned. What specific technologies are you interested in?";
      case 'data_science':
        return "For data science, I recommend starting with Python, statistics, and SQL. Then move on to libraries like pandas, numpy, and scikit-learn. Building projects with real datasets will help solidify your learning. Would you like resources for any specific area?";
      case 'ux_design':
        return "To learn UX design, focus on user research methods, wireframing, prototyping, and usability testing. Tools like Figma and Sketch are industry standards. Building a portfolio of case studies is essential. What specific UX skills are you looking to develop?";
      default:
        return "Continuous learning is essential in any tech career. I recommend a combination of structured courses, hands-on projects, and connecting with communities in your field. What specific skills are you looking to develop?";
    }
  }
  
  // Check for project portfolio
  if (userMessage.includes('portfolio') || userMessage.includes('project')) {
    return "A strong portfolio is crucial to showcase your skills to potential employers. Focus on quality over quantity, include detailed case studies of your process, and make sure your portfolio website itself demonstrates your abilities. What type of projects are you working on currently?";
  }
  
  // Default responses based on specialty
  switch (specialty) {
    case 'software_development':
      return "In software development, it's important to balance learning new technologies with mastering fundamentals. What specific programming challenge or career question can I help you with today?";
    case 'data_science':
      return "Data science combines statistics, programming, and domain knowledge to extract insights from data. What specific data challenge or concept would you like to explore further?";
    case 'ux_design':
      return "Great UX design puts the user at the center of every decision. What specific design challenge are you working on that I can help with?";
    case 'digital_marketing':
      return "Effective digital marketing requires understanding your audience and measuring the right metrics. What specific marketing strategy are you currently developing?";
    case 'product_management':
      return "Product management is about solving user problems while achieving business goals. What product challenge are you currently facing?";
    case 'blockchain':
      return "Blockchain technology is revolutionizing many industries through decentralization and transparency. What specific aspect of blockchain development are you exploring?";
    case 'career_guidance':
      return "Career development in tech requires both technical skills and soft skills like communication and collaboration. What specific career goal are you working toward?";
    default:
      return "That's an interesting question. Can you tell me more about what you're trying to achieve, so I can provide more specific guidance?";
  }
} 