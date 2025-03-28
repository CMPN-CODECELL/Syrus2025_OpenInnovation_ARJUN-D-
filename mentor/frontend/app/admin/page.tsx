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
    const mentors = await getPendingMentors();
    setPendingMentors(mentors);
    setLoading(false);
  }

  async function handleApprove(mentorAddress: string) {
    setApproving(mentorAddress);
    const txHash = await approveMentor(mentorAddress);
    if (txHash) {
      setPendingMentors((prev) =>
        prev.filter((addr) => addr !== mentorAddress)
      );
    }
    setApproving(null);
  }

  if (!isConnected) {
    return (
      <p className="text-center text-lg font-semibold">
        Please connect your wallet.
      </p>
    );
  }

  if (address !== ADMIN_WALLET) {
    return (
      <p className="text-center text-lg font-semibold text-red-500">
        Access Denied: Admin Only
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel - Pending Mentors</CardTitle>
          <CardDescription>Card Description</CardDescription>
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
                <TableCell>{mentor}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleApprove(mentor)}
                    disabled={approving === mentor}
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
        <CardFooter>
         
        </CardFooter>
      </Card>

      
    </div>
  );
}
