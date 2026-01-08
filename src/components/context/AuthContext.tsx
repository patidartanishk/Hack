// Simplified dummy Auth Context because the app no longer uses login.
// This prevents crashes from existing imports while keeping everything simple.

import React, { createContext, useContext } from "react";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  tokens?: number;

  joinedDate: string;

  location?: string;
  institution?: string;
  careerGoal?: string;
  educationLevel?: string;
  streak?: number;
  certifications?: number;
  interests?: [];
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => Promise<boolean>;
  signup: () => Promise<boolean>;
  logout: () => void;
  updateProfile: () => void;
  addTokens: () => void;
  spendTokens: () => boolean;
}

const defaultAuth: AuthContextType = {
  user: {
    id: "demo-user",
    fullName: "Demo User",
    email: "demo@pathly.app",
    tokens: 100,
    joinedDate: "2025-01-01",
  },
  isAuthenticated: true, // 🔥 THIS IS THE KEY FIX
  loading: false,
  login: async () => true,
  signup: async () => true,
  logout: () => { },
  updateProfile: () => { },
  addTokens: () => { },
  spendTokens: () => true,
};


const AuthContext = createContext<AuthContextType>(defaultAuth);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Keep provider simple for now — return the default synchronous dummy auth state.
  return (
    <AuthContext.Provider value={defaultAuth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
