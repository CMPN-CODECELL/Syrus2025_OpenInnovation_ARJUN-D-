"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mentorDAO } from "@/lib/blockchain";
import { Mentor } from "@/lib/blockchain/mentorDAO";

export default function AdminMentorsPage() {
  const [pendingMentors, setPendingMentors] = useState<string[]>([]);
  const [mentorDetails, setMentorDetails] = useState<Record<string, Mentor | null>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [approving, setApproving] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchPendingMentors() {
      try {
        setIsLoading(true);
        const mentorAddresses = await mentorDAO.getPendingMentors();
        setPendingMentors(mentorAddresses as string[]);
        
        // Fetch details for each mentor
        const details: Record<string, Mentor | null> = {};
        for (const address of mentorAddresses) {
          const mentorData = await mentorDAO.getMentorDetails(address);
          details[address] = mentorData;
        }
        setMentorDetails(details);
      } catch (error) {
        console.error("Error fetching pending mentors:", error);
        toast.error("Failed to fetch pending mentors");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPendingMentors();
  }, []);

  async function handleApproveMentor(mentorAddress: string) {
    setApproving({ ...approving, [mentorAddress]: true });
    
    try {
      const result = await mentorDAO.approveMentor(mentorAddress);
      
      if (result.success) {
        toast.success(`Mentor ${mentorAddress} approved successfully!`);
        // Remove from pending list
        setPendingMentors(pendingMentors.filter(addr => addr !== mentorAddress));
      } else {
        throw new Error(result.message || "Failed to approve mentor");
      }
    } catch (error) {
      console.error("Error approving mentor:", error);
      toast.error(error instanceof Error ? error.message : "Failed to approve mentor");
    } finally {
      setApproving({ ...approving, [mentorAddress]: false });
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Pending Mentor Applications</CardTitle>
          <CardDescription>
            Review and approve mentor applications. Once approved, mentors can create and manage projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading pending applications...</div>
          ) : pendingMentors.length === 0 ? (
            <div className="text-center py-8">No pending mentor applications</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingMentors.map((address) => {
                  const mentor = mentorDetails[address];
                  return (
                    <TableRow key={address}>
                      <TableCell>{mentor?.name || "Unknown"}</TableCell>
                      <TableCell>{mentor?.expertise || "Unknown"}</TableCell>
                      <TableCell>{mentor?.email || "Unknown"}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {address.substring(0, 6)}...{address.substring(address.length - 4)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleApproveMentor(address)}
                          disabled={approving[address]}
                          className="bg-emerald-500 text-white hover:bg-emerald-600"
                          size="sm"
                        >
                          {approving[address] ? "Approving..." : "Approve"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 