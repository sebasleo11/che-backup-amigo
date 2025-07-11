import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Folder, 
  FileText, 
  Image, 
  Music, 
  Video, 
  Download,
  Star,
  ArrowRight
} from "lucide-react";

interface FolderSelectorProps {
  onFolderDrop: (folder: string) => void;
  selectedFolders: string[];
}

const FolderSelector = ({ onFolderDrop, selectedFolders }: FolderSelectorProps) => {
  const [draggedFolder, setDraggedFolder] = useState<string | null>(null);

  const systemFolders = [
    { name: "📄 Documentos", icon: FileText, size: "2.4 GB", important: true },
    { name: "🖼️ Imágenes", icon: Image, size: "8.1 GB", important: true },
    { name: "💼 Escritorio", icon: Folder, size: "456 MB", important: true },
    { name: "⬇️ Descargas", icon: Download, size: "1.2 GB", important: false },
    { name: "🎵 Música", icon: Music, size: "3.7 GB", important: false },
    { name: "🎬 Videos", icon: Video, size: "12.5 GB", important: false },
    { name: "📁 Trabajo", icon: Folder, size: "890 MB", important: true },
    { name: "📚 Biblioteca", icon: Folder, size: "234 MB", important: false },
  ];

  const handleDragStart = (folder: string) => {
    setDraggedFolder(folder);
  };

  const handleDragEnd = () => {
    setDraggedFolder(null);
  };

  const handleClick = (folder: string) => {
    if (!selectedFolders.includes(folder)) {
      onFolderDrop(folder);
    }
  };

  return (
    <div className="space-y-3">
      {/* Important Folders First */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">Carpetas importantes</span>
        </div>
        <div className="space-y-2">
          {systemFolders
            .filter(folder => folder.important)
            .map((folder, index) => {
              const isSelected = selectedFolders.includes(folder.name);
              const Icon = folder.icon;
              
              return (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(folder.name)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleClick(folder.name)}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${draggedFolder === folder.name ? 'border-blue-400 bg-blue-50 scale-105' : ''}
                    ${isSelected ? 'border-green-300 bg-green-50 opacity-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <span className="font-medium text-gray-800">{folder.name}</span>
                      <p className="text-xs text-gray-500">{folder.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isSelected && (
                      <Badge variant="secondary" className="text-xs">
                        Agregada
                      </Badge>
                    )}
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Other Folders */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Folder className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Otras carpetas</span>
        </div>
        <div className="space-y-2">
          {systemFolders
            .filter(folder => !folder.important)
            .map((folder, index) => {
              const isSelected = selectedFolders.includes(folder.name);
              const Icon = folder.icon;
              
              return (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(folder.name)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleClick(folder.name)}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${draggedFolder === folder.name ? 'border-blue-400 bg-blue-50 scale-105' : ''}
                    ${isSelected ? 'border-green-300 bg-green-50 opacity-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <span className="font-medium text-gray-800">{folder.name}</span>
                      <p className="text-xs text-gray-500">{folder.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isSelected && (
                      <Badge variant="secondary" className="text-xs">
                        Agregada
                      </Badge>
                    )}
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Add Custom Folder */}
      <div className="pt-4 border-t">
        <Button variant="outline" className="w-full" size="sm">
          <Folder className="h-4 w-4 mr-2" />
          Agregar Carpeta Personalizada
        </Button>
      </div>
    </div>
  );
};

export default FolderSelector;
