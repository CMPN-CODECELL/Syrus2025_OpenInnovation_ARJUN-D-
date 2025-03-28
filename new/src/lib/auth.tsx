"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "mentor";
  profileComplete: boolean;
  wallet?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, "id" | "profileComplete"> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  connectWallet: (address: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const isWalletUpdating = useRef(false);
  
  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem("mentornet_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  // Remove this effect to prevent the loop
  // The connectWallet function will handle wallet updates

  async function login(email: string, password: string) {
    try {
      setIsLoading(true);
      // In a real app, this would make an API call to authenticate
      // For demonstration, we'll create a mock response
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email && password) {
        const mockUser: User = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          email,
          firstName: "Demo",
          lastName: "User",
          role: email.includes("mentor") ? "mentor" : "student",
          profileComplete: false,
          wallet: address || undefined,
        };
        
        setUser(mockUser);
        localStorage.setItem("mentornet_user", JSON.stringify(mockUser));
        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function register(userData: Omit<User, "id" | "profileComplete"> & { password: string }) {
    try {
      setIsLoading(true);
      // In a real app, this would make an API call to register
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        profileComplete: false,
        wallet: address || undefined,
      };
      
      setUser(mockUser);
      localStorage.setItem("mentornet_user", JSON.stringify(mockUser));
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("mentornet_user");
    router.push("/");
  }

  function connectWallet(walletAddress: string) {
    // Check if wallet is already set to avoid loops
    if (user?.wallet === walletAddress) {
      return; // Already connected with this wallet
    }
    
    if (isWalletUpdating.current) {
      return; // Prevent recursive updates
    }
    
    isWalletUpdating.current = true;
    
    try {
      if (user) {
        const updatedUser = { ...user, wallet: walletAddress };
        setUser(updatedUser);
        localStorage.setItem("mentornet_user", JSON.stringify(updatedUser));
      } else {
        // Create a temporary user with just the wallet
        const tempUser: User = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          email: "",
          firstName: "",
          lastName: "",
          role: "student",
          profileComplete: false,
          wallet: walletAddress,
        };
        setUser(tempUser);
        localStorage.setItem("mentornet_user", JSON.stringify(tempUser));
      }
    } finally {
      isWalletUpdating.current = false;
    }
  }

  async function updateProfile(profileData: Partial<User>) {
    try {
      setIsLoading(true);
      
      // In a real app, this would make an API call to update the profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = {
          ...user,
          ...profileData,
          profileComplete: true
        };
        
        setUser(updatedUser);
        localStorage.setItem("mentornet_user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    connectWallet
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 