import { useState, useEffect } from "react";
import axios from "axios";

// Field types and form data types
// Field types for state management
interface BaseField {
  id: number;
  type: string;
  label: string;
  required: boolean;
};

type TextField = BaseField & {
  type: "text" | "email" | "phone" | "textarea";
  placeholder: string;
};

type RatingField = BaseField & {
  type: "rating";
  maxRating: number;
};

type SelectField = BaseField & {
  type: "select";
  options: string[];
  placeholder?: string;
};

type FormField = TextField | RatingField | SelectField;

// Field types for API submission
interface BaseFieldData {
  type: string;
  label: string;
  required: boolean;
}

interface TextFieldData extends BaseFieldData {
  type: "text" | "email" | "phone" | "textarea";
  placeholder: string;
}

interface RatingFieldData extends BaseFieldData {
  type: "rating";
  maxRating: number;
}

interface SelectFieldData extends BaseFieldData {
  type: "select";
  options: string[];
  placeholder?: string;
}

type FieldData = TextFieldData | RatingFieldData | SelectFieldData;

interface FormData {
  name: string;
  description: string;
  category: string;
  fields: FieldData[];
  status: string;
  createdAt: string;
}

// Type guard functions
const isTextField = (field: FormField): field is TextField => {
  return ["text", "email", "phone", "textarea"].includes(field.type);
};

const isRatingField = (field: FormField): field is RatingField => {
  return field.type === "rating";
};

const isSelectField = (field: FormField): field is SelectField => {
  return field.type === "select";
};
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Settings,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
// import { Link } from "react-router-dom"; // Removed router dependency

const FormBuilder = () => {
  const [formName, setFormName] = useState("Customer Satisfaction Survey");
  const [formDescription, setFormDescription] = useState("Help us improve our service by sharing your experience");
  const [formCategory, setFormCategory] = useState("general");
  const [fields, setFields] = useState<FormField[]>([
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

  // Save state
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

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
    const baseField = {
      id: fields.length + 1,
      type: fieldType,
      label: `New ${fieldType} field`,
      required: false,
    };

    let newField: FormField;

    if (fieldType === "rating") {
      newField = {
        ...baseField,
        type: "rating",
        maxRating: 5
      };
    } else if (fieldType === "select") {
      newField = {
        ...baseField,
        type: "select",
        options: ["Option 1", "Option 2", "Option 3"],
        placeholder: "Select an option..."
      };
    } else {
      newField = {
        ...baseField,
        type: fieldType as "text" | "email" | "phone" | "textarea",
        placeholder: `Enter ${fieldType}...`
      };
    }

    setFields([...fields, newField]);
  };

  const removeField = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const updateField = (fieldId, property, value) => {
    setFields(fields.map(field => 
      field.id === fieldId 
        ? { ...field, [property]: value }
        : field
    ));
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, []);

  // Save form function
  const saveForm = async () => {
    setSaving(true);
    setSaveMessage("");
    setSaveError("");

    try {
      // Validate form data
      if (!formName.trim()) {
        throw new Error("Form name is required");
      }

      if (fields.length === 0) {
        throw new Error("At least one field is required");
      }

      // Get orgId and orgCode from localStorage
      const orgId = localStorage.getItem("orgId");
      const orgCode = localStorage.getItem("orgCode");
      if (!orgId || !orgCode) {
        throw new Error("Organization context missing. Please log in again.");
      }

      // Prepare form data
      const formData: FormData & { orgId: string; orgCode: string } = {
        name: formName.trim(),
        description: formDescription.trim(),
        category: formCategory,
        fields: fields.map(field => {
          const baseData: BaseFieldData = {
            type: field.type,
            label: field.label,
            required: field.required
          };

          if (isTextField(field)) {
            return {
              ...baseData,
              type: field.type,
              placeholder: field.placeholder
            };
          } else if (isRatingField(field)) {
            return {
              ...baseData,
              type: "rating",
              maxRating: field.maxRating
            };
          } else if (isSelectField(field)) {
            return {
              ...baseData,
              type: "select",
              options: field.options,
              placeholder: field.placeholder
            };
          }
          return baseData;
        }) as FieldData[],
        status: "active",
        createdAt: new Date().toISOString(),
        orgId,
        orgCode
      };

      // Make API call to save form
      console.log('Saving form data:', formData);
      const response = await axios.post('/api/forms', formData);
      console.log('Response data:', response.data);

      const savedForm = response.data;
      setSaveMessage("Form saved successfully!");
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage("");
      }, 3000);

      // Optionally redirect to dashboard after successful save
      // setTimeout(() => {
      //   window.location.href = "/organization-dashboard";
      // }, 2000);

    } catch (error) {
      console.error("Error saving form:", error);
      setSaveError(error.message || "Failed to save form. Please try again.");
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSaveError("");
      }, 5000);
    } finally {
      setSaving(false);
    }
  };

  const renderFieldPreview = (field) => {
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
            {[...Array(field.maxRating || 5)].map((_, i) => (
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
              <button 
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => window.location.href = "/organization-dashboard"}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FF</span>
                </div>
                <span className="text-xl font-bold">Form Builder</span>
              </button>
              <Badge variant="secondary">Draft</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/organization-dashboard"}
              >
                  <QrCode className="h-4 w-4 mr-2" />
                  Organization QR
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={saveForm}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Form
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Save Messages */}
        {saveMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">{saveMessage}</AlertDescription>
          </Alert>
        )}

        {saveError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{saveError}</AlertDescription>
          </Alert>
        )}

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
                  <Label htmlFor="formName">Form Name *</Label>
                  <Input 
                    id="formName"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="mt-1"
                    placeholder="Enter form name"
                  />
                </div>
                <div>
                  <Label htmlFor="formDescription">Description</Label>
                  <Textarea 
                    id="formDescription"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="mt-1"
                    placeholder="Describe what this form is for"
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
                <CardDescription>Click to add fields to your form</CardDescription>
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
                                  onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                  className="font-medium border-none p-0 h-auto text-base focus:ring-0"
                                  placeholder="Field label"
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
                              
                              {/* Placeholder input for text fields */}
                              {(field.type === 'text' || field.type === 'textarea' || field.type === 'email' || field.type === 'phone') && (
                                <Input
                                  value={field.placeholder || ''}
                                  onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                                  className="text-sm text-gray-500 border-none p-0 h-auto focus:ring-0 mb-2"
                                  placeholder="Placeholder text"
                                />
                              )}
                              
                              {renderFieldPreview(field)}
                              
                              <div className="flex items-center justify-between mt-2">
                                {field.required && (
                                  <Badge variant="secondary" className="text-xs">
                                    Required
                                  </Badge>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateField(field.id, 'required', !field.required)}
                                  className="text-xs"
                                >
                                  {field.required ? 'Make Optional' : 'Make Required'}
                                </Button>
                              </div>
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