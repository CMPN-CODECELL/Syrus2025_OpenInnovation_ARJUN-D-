 "use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CareerAnalysis() {
  return (
    <Card className="h-[550px] flex flex-col">
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Career Analysis</CardTitle>
          <Button variant="outline" size="sm" className="text-mentor hover:text-mentor/90 hover:bg-mentor/10">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
            Update Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto px-0 pb-0 pt-0">
        <Tabs defaultValue="insights" className="h-full flex flex-col">
          <div className="px-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="market">Market Fit</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="insights" className="flex-1 overflow-y-auto m-0 px-4 pb-4">
            <div className="space-y-4">
              <Card className="bg-muted/50 border-none">
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-3 flex items-center text-blue-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-2"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4"/>
                      <path d="M12 8h.01"/>
                    </svg>
                    Career Path Analysis
                  </h3>
                  <p className="text-sm mb-2">Based on your profile and interests, you're on track for a <strong>Senior Frontend Developer</strong> role in the next 18-24 months.</p>
                  <div className="text-xs text-muted-foreground">
                    Your experience with React and modern frontend frameworks positions you well, but adding backend skills would accelerate your path to a full-stack role.
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-3 flex items-center text-green-600">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-2"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                      Strengths
                    </h3>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <div className="text-green-500 mr-2">•</div>
                        <span>Strong React ecosystem knowledge</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-green-500 mr-2">•</div>
                        <span>Modern UI/UX sensibilities</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-green-500 mr-2">•</div>
                        <span>Regular contributions to open source</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-3 flex items-center text-orange-600">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-2"
                      >
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                      </svg>
                      Growth Areas
                    </h3>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <div className="text-orange-500 mr-2">•</div>
                        <span>Backend development experience</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-orange-500 mr-2">•</div>
                        <span>System architecture skills</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-orange-500 mr-2">•</div>
                        <span>Leadership and mentoring experience</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-3 flex items-center text-purple-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-2"
                    >
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    Recommended Actions
                  </h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <div className="text-purple-500 mr-2 font-bold">1.</div>
                      <span>Complete the <strong>"Node.js Microservices"</strong> project to gain backend experience</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-500 mr-2 font-bold">2.</div>
                      <span>Join the upcoming <strong>System Design workshop</strong> (May 15th)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-500 mr-2 font-bold">3.</div>
                      <span>Volunteer as a mentor in the <strong>Web Dev Community Challenge</strong></span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="flex-1 overflow-y-auto m-0 px-4 pb-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-sm">Technical Skills</h3>
                      <span className="text-xs text-muted-foreground">8 verified skills</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>React</span>
                          <span className="text-xs">Advanced • Verified</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>JavaScript</span>
                          <span className="text-xs">Advanced • Verified</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>TypeScript</span>
                          <span className="text-xs">Intermediate • Verified</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CSS/Tailwind</span>
                          <span className="text-xs">Advanced • Verified</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Node.js</span>
                          <span className="text-xs">Beginner</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-sm">Soft Skills</h3>
                      <span className="text-xs text-muted-foreground">5 verified skills</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Problem Solving</span>
                          <span className="text-xs">Advanced • Verified</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Communication</span>
                          <span className="text-xs">Intermediate • Verified</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Team Collaboration</span>
                          <span className="text-xs">Advanced • Verified</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Leadership</span>
                          <span className="text-xs">Beginner</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Time Management</span>
                          <span className="text-xs">Intermediate • Verified</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-sm">Recommended Skill Development</h3>
                    <Button variant="link" size="sm" className="text-xs p-0 h-auto text-mentor">
                      View All Skills
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-md border border-dashed hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="18" 
                          height="18" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M18 12H6"/>
                          <path d="M12 18V6"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Node.js Fundamentals</div>
                        <div className="text-xs text-muted-foreground">Backend skills will complement your frontend expertise</div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">Begin</Button>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md border border-dashed hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="18" 
                          height="18" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M18 12H6"/>
                          <path d="M12 18V6"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">System Architecture</div>
                        <div className="text-xs text-muted-foreground">Learn to design scalable application structures</div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">Begin</Button>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md border border-dashed hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="18" 
                          height="18" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M18 12H6"/>
                          <path d="M12 18V6"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Technical Leadership</div>
                        <div className="text-xs text-muted-foreground">Develop skills to lead engineering teams effectively</div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">Begin</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="market" className="flex-1 overflow-y-auto m-0 px-4 pb-4">
            <div className="space-y-4">
              <Card className="bg-muted/50 border-none">
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-2 flex items-center text-blue-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-2"
                    >
                      <path d="M20 7h-9"/>
                      <path d="M14 17H5"/>
                      <circle cx="17" cy="17" r="3"/>
                      <circle cx="7" cy="7" r="3"/>
                    </svg>
                    Market Analysis
                  </h3>
                  <p className="text-sm mb-1">Your skills are in <strong className="text-green-600">high demand</strong>, with a 85% match to current market needs.</p>
                  <div className="text-xs text-muted-foreground">
                    Based on current job listings in your location, your skills align well with senior frontend roles.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-3">Skills in Demand (Your Region)</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>React</span>
                        <span className="text-green-600 text-xs">Your skill: Advanced</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>TypeScript</span>
                        <span className="text-yellow-600 text-xs">Your skill: Intermediate</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Node.js</span>
                        <span className="text-orange-600 text-xs">Your skill: Beginner</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cloud Services (AWS/GCP)</span>
                        <span className="text-red-600 text-xs">Your skill: Not verified</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CI/CD</span>
                        <span className="text-red-600 text-xs">Your skill: Not verified</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-3">Projected Salary Range</h3>
                  <div className="bg-muted/50 p-3 rounded-lg mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Your Projected Range:</span>
                      <span className="text-sm font-semibold">$95,000 - $125,000</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Based on your verified skills and experience level
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Junior Developer</span>
                      <span>$75,000 - $90,000</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-green-600">
                      <span>Senior Developer</span>
                      <span>$95,000 - $125,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Lead Developer</span>
                      <span>$130,000 - $160,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}