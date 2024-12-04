import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Upload, Undo, Redo, Menu, Download } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { useDiagram } from "../../providers/DiagramContext";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

type ToolbarProps = {
  toggleSidebar: () => void;
};

const Toolbar = ({ toggleSidebar }: ToolbarProps) => {
  const {
    saveDiagram,
    loadDiagram,
    undo,
    redo,
    canUndo,
    canRedo,
    tables,
    relationships,
  } = useDiagram();

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (optional, adjust as needed)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Failed",
          description: "File is too large. Maximum size is 5MB.",
          variant: "destructive",
        });

        return;
      }

      // Check file type
      if (
        file.type !== "application/json" &&
        !file.name.toLowerCase().endsWith(".json")
      ) {
        toast({
          title: "Failed",
          description: "Please upload a valid JSON file.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          try {
            const data = JSON.parse(content);

            // Validate the structure of the imported data
            if (!isValidDiagramData(data)) {
              toast({
                title: "Failed",
                description: "Invalid diagram data structure",
                variant: "destructive",
              });
              return;
            }

            // If validation passes, load the diagram
            loadDiagram(data);

            toast({
              title: "Success",
              description: "Diagram imported successfully!",
            });
          } catch (error) {
            console.error("Error parsing JSON:", error);
            toast({
              title: "Failed",
              description:
                "Failed to parse JSON file. Please check the file format.",
              variant: "destructive",
            });
          }
        }
      };

      reader.onerror = () => {
        toast({
          title: "Failed",
          description: "Error reading file. Please try again..",
          variant: "destructive",
        });
      };

      reader.readAsText(file);
    }
  };

  // Validation function to check the imported data structure
  const isValidDiagramData = (data: any): boolean => {
    // Check if data has required properties
    if (!data || typeof data !== "object") return false;

    // Validate tables array
    if (!Array.isArray(data.tables)) return false;

    // Optional: Add more specific validation
    const isValidTable = (table: any) => {
      return (
        table &&
        typeof table === "object" &&
        typeof table.name === "string" &&
        Array.isArray(table.columns)
      );
    };

    // Validate each table
    if (!data.tables.every(isValidTable)) return false;

    // Validate relationships array (optional, adjust based on your specific needs)
    if (data.relationships && !Array.isArray(data.relationships)) return false;

    return true;
  };

  const handleExport = () => {
    const data = JSON.stringify({ tables, relationships }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "database_diagram.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <TooltipProvider>
      <div className="bg-background border-b px-2 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden"
              >
                <Menu size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle Sidebar</TooltipContent>
          </Tooltip>

          <div className="hidden sm:flex items-center space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={undo}
                  disabled={!canUndo}
                  className="gap-1.5 ml-12"
                >
                  <Undo size={18} />
                  <span className="hidden md:inline">Undo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo Last Action</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={redo}
                  disabled={!canRedo}
                  className="gap-1.5"
                >
                  <Redo size={18} />
                  <span className="hidden md:inline">Redo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo Last Action</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex sm:hidden">
            <div className="flex border rounded-md">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={undo}
                    disabled={!canUndo}
                    className="rounded-r-none border-r"
                  >
                    <Undo size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={redo}
                    disabled={!canRedo}
                    className="rounded-l-none"
                  >
                    <Redo size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={saveDiagram}
                className="gap-1.5"
              >
                <Save size={18} />
                <span className="hidden md:inline">Save</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save Diagram</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Label htmlFor="import-file" className="cursor-pointer">
                <Input
                  id="import-file"
                  type="file"
                  className="hidden"
                  onChange={handleImport}
                  accept=".json"
                />
                <Button variant="ghost" size="sm" className="gap-1.5 hidden">
                  <Upload size={18} />
                  <span className="hidden md:inline">Import</span>
                </Button>
              </Label>
            </TooltipTrigger>
            <TooltipContent>Import JSON</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                className="gap-1.5"
              >
                <Download size={18} />
                <span className="hidden md:inline">Export</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export as JSON</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Toolbar;
