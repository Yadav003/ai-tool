import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Download, RefreshCw } from "lucide-react";

interface ImageGenerationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const stylePresets = [
  { value: "realistic", label: "Realistic" },
  { value: "artistic", label: "Artistic" },
  { value: "minimal", label: "Minimal" },
  { value: "anime", label: "Anime" },
];

const aspectRatios = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Landscape (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "4:3", label: "Standard (4:3)" },
];

export const ImageGenerationModal = ({ open, onOpenChange }: ImageGenerationModalProps) => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Generate Image
          </DialogTitle>
          <DialogDescription>
            Describe the image you want to create. Be specific for best results.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Left: Controls */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <Textarea
                placeholder="A serene landscape with mountains at sunset, photorealistic style..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stylePresets.map((preset) => (
                      <SelectItem key={preset.value} value={preset.value}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full gradient-primary"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Image
                </>
              )}
            </Button>
          </div>

          {/* Right: Preview/Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center border border-border overflow-hidden">
              {isGenerating ? (
                <div className="text-center space-y-2">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">Creating your masterpiece...</p>
                </div>
              ) : (
                <div className="text-center space-y-2 p-6">
                  <Wand2 className="w-12 h-12 mx-auto text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    Your generated image will appear here
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" disabled>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="flex-1" disabled>
                <RefreshCw className="w-4 h-4 mr-2" />
                Variations
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Recent Generations</Label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-muted/50 border border-border cursor-pointer hover:border-primary transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
