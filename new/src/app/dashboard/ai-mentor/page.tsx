"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const topicOptions = [
  { value: "blockchain", label: "Blockchain Fundamentals" },
  { value: "smart-contracts", label: "Smart Contracts" },
  { value: "defi", label: "DeFi Concepts" },
  { value: "web3", label: "Web3 Development" },
  { value: "nft", label: "NFTs & Digital Assets" },
  { value: "dao", label: "DAOs & Governance" },
  { value: "security", label: "Blockchain Security" },
];

export default function AIMentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your AI mentor for blockchain and web3 topics. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [topic, setTopic] = useState("blockchain");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiResponses: Record<string, string[]> = {
        blockchain: [
          "Blockchain is a distributed ledger technology that records transactions across many computers. Would you like to know more about how blocks are created?",
          "The core innovation of blockchain is its ability to create trust in a trustless environment through consensus mechanisms. Would you like to learn about Proof of Work vs Proof of Stake?",
        ],
        "smart-contracts": [
          "Smart contracts are self-executing programs that run on a blockchain. They automatically execute when predefined conditions are met. What aspect of smart contracts would you like to explore?",
          "Solidity is one of the most popular languages for writing smart contracts on Ethereum. Have you tried writing any smart contracts yet?",
        ],
        defi: [
          "Decentralized Finance (DeFi) refers to financial services built on blockchain technology that operate without centralized intermediaries. Would you like to learn about liquidity pools?",
          "Yield farming is a way to earn rewards by providing liquidity to DeFi protocols. Are you interested in understanding how APY is calculated in DeFi?",
        ],
        web3: [
          "Web3 development involves building applications that interact with blockchain networks. Would you like to know more about web3.js or ethers.js libraries?",
          "When building dApps, you'll need to connect to user wallets. Have you experimented with MetaMask or WalletConnect integration?",
        ],
        nft: [
          "NFTs (Non-Fungible Tokens) represent unique digital assets on the blockchain. Would you like to understand the ERC-721 standard?",
          "NFT marketplaces use smart contracts to handle sales and royalties. Are you interested in how royalty mechanisms work?",
        ],
        dao: [
          "DAOs (Decentralized Autonomous Organizations) are member-owned communities without centralized leadership. Would you like to know how governance tokens work?",
          "On-chain governance allows token holders to vote on proposals directly through the blockchain. Have you participated in any DAO governance before?",
        ],
        security: [
          "Smart contract security is critical to prevent exploits and hacks. Common vulnerabilities include reentrancy attacks and overflow/underflow. Would you like to learn how to audit contracts?",
          "Secure development practices include using established libraries, formal verification, and comprehensive testing. Are you familiar with tools like Slither or Mythril?",
        ],
      };
      
      // Get random response for the selected topic
      const topicResponses = aiResponses[topic] || aiResponses.blockchain;
      const randomResponse = topicResponses[Math.floor(Math.random() * topicResponses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI Mentor</h1>
          <p className="text-gray-500">Get personalized guidance on blockchain topics</p>
        </div>
        <div className="w-1/3">
          <Select
            value={topic}
            onValueChange={(value) => setTopic(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Topic" />
            </SelectTrigger>
            <SelectContent>
              {topicOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card className="mb-4">
        <CardContent className="p-0">
          <div className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[70%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className={`w-8 h-8 ${
                      message.role === "user" ? "ml-2" : "mr-2"
                    }`}>
                      {message.role === "user" ? (
                        <div className="bg-emerald-500 w-full h-full flex items-center justify-center text-white">
                          U
              </div>
                      ) : (
                        <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white">
                          AI
                        </div>
                      )}
                    </Avatar>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
              </div>
            </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="flex">
                    <Avatar className="w-8 h-8 mr-2">
                      <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white">
                        AI
          </div>
                        </Avatar>
                    <div className="p-3 rounded-lg bg-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex space-x-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask your blockchain mentor..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                  Send
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
          </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Suggested Questions</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left" 
              onClick={() => {
                setInputValue("What is a blockchain consensus mechanism?");
                setTimeout(() => handleSendMessage(), 100);
              }}
            >
              What is a blockchain consensus mechanism?
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              onClick={() => {
                setInputValue("How do smart contracts work?");
                setTimeout(() => handleSendMessage(), 100);
              }}
            >
              How do smart contracts work?
            </Button>
        <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              onClick={() => {
                setInputValue("Explain liquidity pools in DeFi");
                setTimeout(() => handleSendMessage(), 100);
              }}
            >
              Explain liquidity pools in DeFi
        </Button>
      </div>
    </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Learning Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="p-2 hover:bg-slate-100 rounded">
              <a href="#" className="flex items-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Blockchain Fundamentals Guide
              </a>
            </li>
            <li className="p-2 hover:bg-slate-100 rounded">
              <a href="#" className="flex items-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Smart Contract Development Tutorial
              </a>
            </li>
            <li className="p-2 hover:bg-slate-100 rounded">
              <a href="#" className="flex items-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Web3 Security Best Practices
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 