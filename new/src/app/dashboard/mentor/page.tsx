import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AIMentorPage() {
  // ... existing code ...
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <div className="grid h-full lg:grid-cols-[280px_1fr]">
          {/* Chat History Sidebar */}
          <div className="hidden lg:flex h-full flex-col border-r">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Chat History</h2>
              <p className="text-sm text-muted-foreground">Your previous conversations</p>
            </div>
            
            <div className="flex-1 overflow-auto py-2">
              <div className="px-4 space-y-1">
                <Button variant="secondary" className="w-full justify-start" onClick={handleNewChat}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </div>
              
              <div className="mt-4 px-2 space-y-1">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 cursor-pointer ${
                      activeChatIndex === index ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setActiveChatIndex(index)}
                  >
                    <div className="flex items-center">
                      <MessageSquareIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium truncate max-w-[180px]">
                        {chat.title || "New conversation"}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(index);
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium">Current Mentor</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentMentor?.name || "Choose a mentor"}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreVerticalIcon className="h-4 w-4" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleNewChat}>
                      <PlusIcon className="mr-2 h-4 w-4" />
                      New Chat
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UsersIcon className="mr-2 h-4 w-4" />
                      Change Mentor
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          {/* Main Chat Area */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h2 className="text-lg font-semibold">AI Mentor Chat</h2>
                <p className="text-sm text-muted-foreground">
                  Chat with your personalized AI Mentor
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <ClockIcon className="h-4 w-4" />
                  <span className="sr-only">History</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <SettingsIcon className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </div>
            </div>
            
            {/* Mobile: New Chat Button */}
            <div className="lg:hidden p-4 border-b">
              <Button className="w-full" onClick={handleNewChat}>
                <PlusIcon className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </div>
            
            {/* Messages Container */}
            <div className="flex-1 overflow-auto p-4 space-y-4" ref={messagesContainerRef}>
              {activeChatIndex !== null && 
                chatHistory[activeChatIndex]?.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              
              {activeChatIndex === null && (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MessageSquareIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Start a new conversation</h3>
                  <p className="text-muted-foreground mb-4">
                    Your AI mentor is here to help you learn and grow
                  </p>
                  <Button onClick={handleNewChat}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New Chat
                  </Button>
                </div>
              )}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  autoFocus
                  ref={inputRef}
                />
                <Button type="submit" disabled={!inputMessage.trim()}>
                  <SendIcon className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 