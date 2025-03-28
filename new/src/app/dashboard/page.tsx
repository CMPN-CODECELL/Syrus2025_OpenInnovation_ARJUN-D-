"use client"

import { useAccount } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Sample data for the chart
const data = [
  {
    name: "Jan",
    tokens: 400,
  },
  {
    name: "Feb",
    tokens: 300,
  },
  {
    name: "Mar",
    tokens: 500,
  },
  {
    name: "Apr",
    tokens: 450,
  },
  {
    name: "May",
    tokens: 470,
  },
  {
    name: "Jun",
    tokens: 600,
  },
]

// Sample learning paths
const learningPaths = [
  {
    id: 1,
    title: "Blockchain Fundamentals",
    progress: 65,
    modules: 12,
    completed: 8,
  },
  {
    id: 2,
    title: "Smart Contract Development",
    progress: 30,
    modules: 10,
    completed: 3,
  },
  {
    id: 3,
    title: "Web3 Frontend Development",
    progress: 10,
    modules: 8,
    completed: 1,
  },
]

// Sample marketplace items
const marketplaceItems = [
  {
    id: 1,
    title: "DeFi Masterclass",
    author: "Alex Johnson",
    price: "50 MATIC",
    image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=DeFi+Masterclass",
  },
  {
    id: 2,
    title: "NFT Creation Workshop",
    author: "Maria Garcia",
    price: "35 MATIC",
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=NFT+Workshop",
  },
  {
    id: 3,
    title: "Blockchain Security",
    author: "David Chen",
    price: "45 MATIC",
    image: "https://placehold.co/600x400/ef4444/FFFFFF/png?text=Security",
  },
]

export default function DashboardPage() {
  const { isConnected } = useAccount()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learning Hours</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
              >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">
              +2.5 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earned Tokens</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <path d="M9 9h.01M15 9h.01" />
              </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250 MENT</div>
            <p className="text-xs text-muted-foreground">
              +36 MENT from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
              >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
              </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mentorships</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
              >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              1 session scheduled today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>
              Your token earnings over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar
                  dataKey="tokens"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Your Learning Paths</CardTitle>
            <CardDescription>
              Track your progress in active learning paths
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningPaths.map((path) => (
                <div key={path.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                    <div className="font-medium">{path.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {path.completed}/{path.modules} modules
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                </div>
              ))}
              <Button asChild className="w-full mt-4">
                <Link href="/dashboard/learn">View All Courses</Link>
                  </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
          <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Marketplace</h2>
          <Button asChild variant="outline">
            <Link href="/dashboard/marketplace">View All</Link>
                    </Button>
                  </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {marketplaceItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                </div>
              <CardContent className="pt-4">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">by {item.author}</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.price}</span>
                  <Button variant="outline" size="sm">
                    View Details
                    </Button>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
          </div>
          
      {!isConnected && (
        <Card className="bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                className="h-6 w-6 text-primary"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <path d="M14 2v6h6" />
                <path d="M12 12v6" />
                <path d="M15 15l-3-3-3 3" />
                  </svg>
              </div>
            <h3 className="mb-2 text-xl font-bold">Connect Your Wallet</h3>
            <p className="mb-4 text-sm text-muted-foreground max-w-md">
              Connect your Polygon Amoy wallet to access all features, including token earning, course purchases, and mentor sessions.
            </p>
            </CardContent>
          </Card>
      )}
    </div>
  )
} 