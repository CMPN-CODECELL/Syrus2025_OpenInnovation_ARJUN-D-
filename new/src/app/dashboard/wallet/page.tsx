import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Wallet</h2>
          <p className="text-muted-foreground">
            Connect your crypto wallet to verify skills and certifications
          </p>
        </div>
      </div>

      {/* Wallet Connection */}
      <Card>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Link your blockchain wallet to receive and manage your skill NFTs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="36" 
                height="36" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 15v4h16a2 2 0 0 0 0-4H3z" />
                <path d="M18 3v13" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">No Wallet Connected</h3>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to receive blockchain verification for your skills and mentorship sessions.
              </p>
              <div className="flex flex-col gap-3">
                <Button variant="mentor" className="w-full">
                  Connect MetaMask
                </Button>
                <Button variant="outline" className="w-full">
                  Connect WalletConnect
                </Button>
                <Button variant="outline" className="w-full">
                  Connect Coinbase Wallet
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Connect Your Wallet */}
      <Card>
        <CardHeader>
          <CardTitle>Why Connect Your Wallet?</CardTitle>
          <CardDescription>
            Benefits of blockchain verification for your skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Verified Credentials</h3>
              <p className="text-sm text-muted-foreground">
                Receive tamper-proof skill certifications as NFTs that can be verified by employers and educational institutions.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#2563eb" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Secure Ownership</h3>
              <p className="text-sm text-muted-foreground">
                Maintain full ownership of your credentials and control who can access and view them, with the security of blockchain technology.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#7c3aed" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" x2="22" y1="12" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Global Recognition</h3>
              <p className="text-sm text-muted-foreground">
                Your verified skills are recognized across borders and platforms, enabling seamless transitions between jobs and education programs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supported Networks */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Networks</CardTitle>
          <CardDescription>
            Blockchain networks compatible with MentorNet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-indigo-600 rounded-full"></div>
              </div>
              <h3 className="font-medium text-sm">Ethereum</h3>
              <p className="text-xs text-muted-foreground mt-1">Main Network</p>
            </div>

            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="font-medium text-sm">Polygon</h3>
              <p className="text-xs text-muted-foreground mt-1">Layer 2 Scaling</p>
            </div>

            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="font-medium text-sm">Arbitrum</h3>
              <p className="text-xs text-muted-foreground mt-1">Optimistic Rollup</p>
            </div>

            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-teal-600 rounded-full"></div>
              </div>
              <h3 className="font-medium text-sm">Optimism</h3>
              <p className="text-xs text-muted-foreground mt-1">Optimistic Rollup</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 