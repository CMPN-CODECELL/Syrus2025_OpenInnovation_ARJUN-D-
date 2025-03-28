import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Mentor Chat</h1>
        <Button variant="outline">
          <span className="mr-2">+</span>
          New Conversation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          {/* AI Mentors */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">AI Mentor Agents</CardTitle>
              <CardDescription>Select a specialized mentor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="cursor-pointer p-2 rounded-lg bg-indigo-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">CG</div>
                <div>
                  <h3 className="font-medium text-sm">Career Guide</h3>
                  <p className="text-xs text-muted-foreground">Career path planning</p>
                </div>
              </div>
              <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">TM</div>
                <div>
                  <h3 className="font-medium text-sm">Technical Mentor</h3>
                  <p className="text-xs text-muted-foreground">Coding & technical skills</p>
                </div>
              </div>
              <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">IC</div>
                <div>
                  <h3 className="font-medium text-sm">Interview Coach</h3>
                  <p className="text-xs text-muted-foreground">Interview preparation</p>
                </div>
              </div>
              <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">RR</div>
                <div>
                  <h3 className="font-medium text-sm">Resume Reviewer</h3>
                  <p className="text-xs text-muted-foreground">Resume optimization</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Conversations</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                <h3 className="font-medium text-sm">Data Science Career Transition</h3>
                <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
              </div>
              <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                <h3 className="font-medium text-sm">React vs Angular Discussion</h3>
                <p className="text-xs text-muted-foreground">Nov 2, 2023</p>
              </div>
              <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                <h3 className="font-medium text-sm">Resume Review for Tech Lead</h3>
                <p className="text-xs text-muted-foreground">Oct 28, 2023</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="md:col-span-3">
          <Card className="h-[75vh] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">CG</div>
                <div>
                  <CardTitle>Career Guide</CardTitle>
                  <CardDescription>AI Career Advisor</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto py-4 space-y-4">
              {/* AI Message */}
              <div className="flex gap-3 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">CG</div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm">
                    Welcome to MentorNet! I'm your AI Career Guide. I can help you with career planning, skill development advice, industry insights, and professional growth strategies. How can I assist you today?
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex flex-row-reverse gap-3 max-w-3xl ml-auto">
                <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold text-xs">ME</div>
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <p className="text-sm">
                    I'm currently a web developer but interested in transitioning to data science. What skills should I develop to make this switch successfully?
                  </p>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex gap-3 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">CG</div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm">
                    Great question! Transitioning from web development to data science is a smart move that leverages some of your existing technical skills. Here are the key skills to develop:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li><span className="font-medium">Python programming</span> - The primary language for data science</li>
                    <li><span className="font-medium">Data analysis libraries</span> - pandas, NumPy, scikit-learn, TensorFlow/PyTorch</li>
                    <li><span className="font-medium">Statistics and mathematics</span> - Understanding probability, linear algebra, and calculus</li>
                    <li><span className="font-medium">SQL</span> - For database querying and data manipulation</li>
                    <li><span className="font-medium">Data visualization</span> - Using tools like Matplotlib, Seaborn, or Tableau</li>
                    <li><span className="font-medium">Machine learning concepts</span> - Understanding algorithms and model evaluation</li>
                  </ul>
                  <p className="text-sm mt-2">
                    Your web development background gives you an advantage in understanding programming logic and potentially in data visualization. Would you like me to recommend specific learning resources or suggest a project to start with?
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex flex-row-reverse gap-3 max-w-3xl ml-auto">
                <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold text-xs">ME</div>
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <p className="text-sm">
                    Yes, please suggest some learning resources and a good first project I could work on to apply these skills.
                  </p>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex gap-3 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">CG</div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm">
                    Here are some recommended learning resources for your transition:
                  </p>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="bg-white p-2 rounded border">
                      <h4 className="font-medium">Online Courses</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>DataCamp's "Data Scientist with Python" career track</li>
                        <li>Coursera's "Data Science Specialization" by Johns Hopkins</li>
                        <li>Fast.ai for practical deep learning</li>
                      </ul>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <h4 className="font-medium">Books</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>"Python for Data Analysis" by Wes McKinney</li>
                        <li>"Hands-On Machine Learning" by Aurélien Géron</li>
                        <li>"The Elements of Statistical Learning" for more advanced concepts</li>
                      </ul>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <h4 className="font-medium">Beginner Project Idea</h4>
                      <p>Build a data dashboard that visualizes web analytics data. This leverages your web skills while practicing data science:</p>
                      <ol className="list-decimal pl-5 text-sm">
                        <li>Collect sample web analytics data (Google Analytics has an API)</li>
                        <li>Clean and process the data with pandas</li>
                        <li>Create visualizations with Plotly or D3.js</li>
                        <li>Build a simple dashboard with Flask or Streamlit</li>
                        <li>Add simple predictive features like traffic forecasting</li>
                      </ol>
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    Would you like me to help you outline a learning path with specific milestones for the next 3-6 months?
                  </p>
                </div>
              </div>
            </CardContent>

            <div className="border-t p-4">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" className="text-xs">How do I build a portfolio?</Button>
                <Button variant="outline" size="sm" className="text-xs">Best data science certifications?</Button>
                <Button variant="outline" size="sm" className="text-xs">Data science vs ML engineering?</Button>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Button>Send</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 