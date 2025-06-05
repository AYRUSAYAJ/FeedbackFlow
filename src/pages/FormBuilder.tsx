import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Save,
  Eye,
  QrCode,
  Type,
  Star,
  Image,
  List,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Hash,
  ToggleLeft,
  GripVertical,
  Trash2,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const FormBuilder = () => {
  const [formName, setFormName] = useState("Customer Satisfaction Survey");
  const [formDescription, setFormDescription] = useState("Help us improve our service by sharing your experience");
  const [formCategory, setFormCategory] = useState("general");
  const [fields, setFields] = useState([
    {
      id: 1,
      type: "text",
      label: "Your Name",
      placeholder: "Enter your full name",
      required: true
    },
    {
      id: 2,
      type: "rating",
      label: "Overall Satisfaction",
      maxRating: 5,
      required: true
    },
    {
      id: 3,
      type: "textarea",
      label: "Comments",
      placeholder: "Tell us about your experience...",
      required: false
    }
  ]);

  // Organization info for QR code generation
  const orgInfo = {
    name: "City General Hospital",
    feedbackUrl: "https://feedback.cityhospital.com"
  };

  const fieldTypes = [
    { type: "text", label: "Text Input", icon: Type },
    { type: "textarea", label: "Long Text", icon: Type },
    { type: "rating", label: "Star Rating", icon: Star },
    { type: "select", label: "Dropdown", icon: List },
    { type: "email", label: "Email", icon: Mail },
    { type: "phone", label: "Phone", icon: Phone },
    { type: "number", label: "Number", icon: Hash },
    { type: "date", label: "Date", icon: Calendar },
    { type: "image", label: "Image Upload", icon: Image },
    { type: "location", label: "Location", icon: MapPin },
    { type: "toggle", label: "Yes/No", icon: ToggleLeft }
  ];

  const addField = (fieldType: string) => {
    const newField = {
      id: fields.length + 1,
      type: fieldType,
      label: `New ${fieldType} field`,
      placeholder: `Enter ${fieldType}...`,
      required: false
    };
    setFields([...fields, newField]);
  };

  const removeField = (fieldId: number) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  // ... keep existing code (renderFieldPreview function)
  const renderFieldPreview = (field: any) => {
    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <Input 
            placeholder={field.placeholder} 
            className="mt-2"
            disabled
          />
        );
      case "textarea":
        return (
          <Textarea 
            placeholder={field.placeholder} 
            className="mt-2"
            disabled
          />
        );
      case "rating":
        return (
          <div className="flex space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>
        );
      case "select":
        return (
          <Select disabled>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
          </Select>
        );
      case "date":
        return (
          <Input 
            type="date" 
            className="mt-2"
            disabled
          />
        );
      case "number":
        return (
          <Input 
            type="number" 
            placeholder="Enter number..." 
            className="mt-2"
            disabled
          />
        );
      case "image":
        return (
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500">
            <Image className="h-8 w-8 mx-auto mb-2" />
            Click to upload image
          </div>
        );
      case "toggle":
        return (
          <div className="flex items-center space-x-2 mt-2">
            <ToggleLeft className="h-6 w-6 text-gray-400" />
            <span className="text-sm text-gray-600">Yes/No toggle</span>
          </div>
        );
      default:
        return (
          <Input 
            placeholder={field.placeholder} 
            className="mt-2"
            disabled
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/organization-dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FF</span>
                </div>
                <span className="text-xl font-bold">Form Builder</span>
              </Link>
              <Badge variant="secondary">Draft</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Link to="/organization-dashboard">
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Organization QR
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Save className="h-4 w-4 mr-2" />
                Save Form
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
                <CardDescription>Configure your feedback form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="formName">Form Name</Label>
                  <Input 
                    id="formName"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="formDescription">Description</Label>
                  <Textarea 
                    id="formDescription"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="formCategory">Category</Label>
                  <Select value={formCategory} onValueChange={setFormCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Feedback</SelectItem>
                      <SelectItem value="medical">Medical Services</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="food">Food Service</SelectItem>
                      <SelectItem value="facilities">Facilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Field Types</CardTitle>
                <CardDescription>Drag to add fields to your form</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {fieldTypes.map((fieldType) => (
                    <Button
                      key={fieldType.type}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-3"
                      onClick={() => addField(fieldType.type)}
                    >
                      <fieldType.icon className="h-4 w-4 mr-2" />
                      <span className="text-xs">{fieldType.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Builder */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="builder" className="space-y-6">
              <TabsList>
                <TabsTrigger value="builder">Form Builder</TabsTrigger>
                <TabsTrigger value="preview">Live Preview</TabsTrigger>
                <TabsTrigger value="organization-qr">Organization QR</TabsTrigger>
              </TabsList>

              <TabsContent value="builder">
                <Card>
                  <CardHeader>
                    <CardTitle>{formName}</CardTitle>
                    <CardDescription>{formDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="group relative">
                          <div className="flex items-start space-x-2 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                            <GripVertical className="h-5 w-5 text-gray-400 mt-2 cursor-move" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <Input
                                  value={field.label}
                                  onChange={(e) => {
                                    const newFields = [...fields];
                                    newFields[index].label = e.target.value;
                                    setFields(newFields);
                                  }}
                                  className="font-medium border-none p-0 h-auto text-base focus:ring-0"
                                />
                                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="outline" size="sm">
                                    <Settings className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => removeField(field.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              {renderFieldPreview(field)}
                              {field.required && (
                                <Badge variant="secondary" className="mt-2 text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {fields.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>Add fields from the sidebar to build your form</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview">
                <Card>
                  <CardHeader>
                    <CardTitle>Form Preview</CardTitle>
                    <CardDescription>See how your form will look to users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="max-w-md mx-auto bg-white border rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold mb-2">{formName}</h3>
                      <p className="text-sm text-gray-600 mb-6">{formDescription}</p>
                      
                      <div className="space-y-4">
                        {fields.map((field) => (
                          <div key={field.id}>
                            <Label className="block text-sm font-medium mb-1">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            {renderFieldPreview(field)}
                          </div>
                        ))}
                        
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 mt-6">
                          Submit Feedback
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="organization-qr">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization QR Code</CardTitle>
                    <CardDescription>One QR code for all feedback forms in your organization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-6">
                      <div className="bg-white inline-block p-8 border rounded-lg shadow-sm">
                        <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                          <QrCode className="h-24 w-24 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          Organization: <strong>{orgInfo.name}</strong>
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          URL: {orgInfo.feedbackUrl}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          This QR code provides access to all feedback forms in your organization.
                          Users can select which form to fill out after scanning.
                        </p>
                        <div className="flex justify-center space-x-4">
                          <Button variant="outline">Download PNG</Button>
                          <Button variant="outline">Download SVG</Button>
                          <Button variant="outline">Print</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
