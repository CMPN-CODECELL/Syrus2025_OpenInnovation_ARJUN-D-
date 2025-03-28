import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Community</h2>
          <p className="text-muted-foreground">
            Connect with peers and mentors in the MentorNet community
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Find Mentors
          </Button>
          <Button variant="mentor" size="sm">
            Create Post
          </Button>
        </div>
      </div>

      {/* Featured Members */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Community Members</CardTitle>
          <CardDescription>Top contributors this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Member 1 */}
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold mb-3">
                JD
              </div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground mb-2">Senior Developer</p>
              <div className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs mb-3">
                Blockchain Expert
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Profile
              </Button>
            </div>

            {/* Member 2 */}
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold mb-3">
                AJ
              </div>
              <h3 className="font-medium">Alice Johnson</h3>
              <p className="text-sm text-muted-foreground mb-2">UI/UX Designer</p>
              <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mb-3">
                Design Mentor
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Profile
              </Button>
            </div>

            {/* Member 3 */}
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl font-bold mb-3">
                RK
              </div>
              <h3 className="font-medium">Robert Kim</h3>
              <p className="text-sm text-muted-foreground mb-2">Data Scientist</p>
              <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mb-3">
                ML Expert
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Profile
              </Button>
            </div>

            {/* Member 4 */}
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-xl font-bold mb-3">
                SJ
              </div>
              <h3 className="font-medium">Sarah Jones</h3>
              <p className="text-sm text-muted-foreground mb-2">Product Manager</p>
              <div className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs mb-3">
                Career Advisor
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Discussions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Discussions</CardTitle>
          <CardDescription>Join the conversation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Discussion 1 */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                    JD
                  </div>
                  <div>
                    <h3 className="font-medium">Best practices for Web3 authentication</h3>
                    <p className="text-xs text-muted-foreground">Posted by John Doe • 2 days ago</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                  Blockchain
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                I'm working on a dApp and struggling with the best approach for user authentication. Should I use wallet-based auth only or combine it with traditional methods?
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>12 replies</span>
                  <span>28 likes</span>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  View Discussion
                </Button>
              </div>
            </div>

            {/* Discussion 2 */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">
                    RK
                  </div>
                  <div>
                    <h3 className="font-medium">Career transition from web dev to data science</h3>
                    <p className="text-xs text-muted-foreground">Posted by Robert Kim • 5 days ago</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Career
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                I recently made the switch from frontend development to data science. Here's my learning path and recommendations for others looking to make a similar transition.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>34 replies</span>
                  <span>76 likes</span>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  View Discussion
                </Button>
              </div>
            </div>

            {/* Discussion 3 */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                    AJ
                  </div>
                  <div>
                    <h3 className="font-medium">Design systems for Web3 applications</h3>
                    <p className="text-xs text-muted-foreground">Posted by Alice Johnson • 1 week ago</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Design
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                I'm creating a UI component library for blockchain applications. What unique considerations should we keep in mind for Web3 user interfaces?
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>17 replies</span>
                  <span>42 likes</span>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  View Discussion
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 