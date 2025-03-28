import { Button } from "@/components/ui/button";

export default function TestPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold">Tailwind CSS Test Page</h1>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Text Gradients</h2>
        <div className="space-y-2">
          <p className="mentor-gradient text-2xl font-bold">Mentor Gradient Text</p>
          <p className="student-gradient text-2xl font-bold">Student Gradient Text</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="mentor">Mentor Button</Button>
          <Button variant="student">Student Button</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Background Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-primary text-primary-foreground rounded">Primary</div>
          <div className="p-4 bg-secondary text-secondary-foreground rounded">Secondary</div>
          <div className="p-4 bg-muted text-muted-foreground rounded">Muted</div>
          <div className="p-4 bg-accent text-accent-foreground rounded">Accent</div>
          <div className="p-4 bg-[#4F46E5] text-white rounded">Mentor Color</div>
          <div className="p-4 bg-[#0284C7] text-white rounded">Student Color</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Border Test</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 rounded">Border Slate</div>
          <div className="p-4 border-2 border-[#4F46E5] rounded">Border Mentor</div>
          <div className="p-4 border-2 border-[#0284C7] rounded">Border Student</div>
        </div>
      </div>
      
      <div className="p-8 ai-mentor-animate text-white rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Animated Background</h2>
        <p>This section has an animated gradient background</p>
      </div>
    </div>
  );
} 