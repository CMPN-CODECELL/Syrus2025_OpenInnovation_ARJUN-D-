"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { getPendingMentors, approveMentor } from "@/lib/mentorUtils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// The wallet address of the admin - replace with your own or environment variable
const ADMIN_WALLET = "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7";

export default function AdminPage() {
  const { address, isConnected } = useAccount();
  const [pendingMentors, setPendingMentors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address === ADMIN_WALLET) {
      fetchPendingMentors();
    }
  }, [isConnected, address]);

  async function fetchPendingMentors() {
    setLoading(true);
    try {
      const mentors = await getPendingMentors();
      setPendingMentors(mentors);
    } catch (error) {
      console.error("Error fetching pending mentors:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(mentorAddress: string) {
    setApproving(mentorAddress);
    try {
      const result = await approveMentor(mentorAddress);
      if (result.success) {
        setPendingMentors((prev) =>
          prev.filter((addr) => addr !== mentorAddress)
        );
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      console.error("Error approving mentor:", error);
      toast.error(error.message || "Failed to approve mentor");
    } finally {
      setApproving(null);
    }
  }

  if (!isConnected) {
    return (
      <p className="text-center text-lg font-semibold p-10">
        Please connect your wallet to access the admin panel.
      </p>
    );
  }

  if (address !== ADMIN_WALLET) {
    return (
      <p className="text-center text-lg font-semibold text-red-500 p-10">
        Access Denied: Admin Only
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel - Pending Mentors</CardTitle>
          <CardDescription>Approve mentor applications</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center">Loading pending mentors...</p>
          ) : pendingMentors.length === 0 ? (
            <p className="text-center text-green-500">No pending mentors.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor Address</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingMentors.map((mentor) => (
                  <TableRow key={mentor}>
                    <TableCell className="font-mono">{mentor}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleApprove(mentor)}
                        disabled={approving === mentor}
                        className="bg-emerald-500"
                      >
                        {approving === mentor ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          "Approve"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={fetchPendingMentors} 
            variant="outline"
            disabled={loading}
          >
            Refresh
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 