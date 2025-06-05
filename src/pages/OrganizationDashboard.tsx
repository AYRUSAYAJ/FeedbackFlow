
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Settings, 
  Plus, 
  QrCode,
  Eye,
  Edit,
  Copy,
  Trash2,
  Star,
  MessageSquare,
  Calendar,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const OrganizationDashboard = () => {
  const [selectedForm, setSelectedForm] = useState<number | null>(null);

  const orgInfo = {
    name: "City General Hospital",
    type: "Healthcare",
    primaryColor: "#3B82F6",
    logo: "🏥"
  };

  const stats = [
    {
      title: "Total Forms",
      value: "12",
      change: "+3 this month",
      icon: MessageSquare
    },
    {
      title: "Total Responses",
      value: "2,847",
      change: "+340 this week",
      icon: BarChart3
    },
    {
      title: "Avg Rating",
      value: "4.2",
      change: "+0.3 improvement",
      icon: Star
    },
    {
      title: "Response Rate",
      value: "72%",
      change: "+8% this month",
      icon: TrendingUp
    }
  ];

  const feedbackForms = [
    {
      id: 1,
      name: "Doctor Consultation",
      category: "Medical Services",
      responses: 1247,
      avgRating: 4.3,
      lastResponse: "2 hours ago",
      status: "active",
      qrScans: 2890
    },
    {
      id: 2,
      name: "Emergency Department",
      category: "Medical Services", 
      responses: 892,
      avgRating: 3.8,
      lastResponse: "5 hours ago",
      status: "active",
      qrScans: 1543
    },
    {
      id: 3,
      name: "Food Service",
      category: "Hospitality",
      responses: 534,
      avgRating: 4.1,
      lastResponse: "1 day ago",
      status: "active",
      qrScans: 789
    },
    {
      id: 4,
      name: "Parking Experience",
      category: "Facilities",
      responses: 174,
      avgRating: 3.2,
      lastResponse: "3 days ago",
      status: "inactive",
      qrScans: 298
    }
  ];

  const recentFeedback = [
    {
      form: "Doctor Consultation",
      rating: 5,
      comment: "Excellent care and very attentive staff. Dr. Smith was wonderful!",
      time: "15 minutes ago"
    },
    {
      form: "Emergency Department",
      rating: 4,
      comment: "Quick service during a busy time. Could improve wait area comfort.",
      time: "1 hour ago"
    },
    {
      form: "Food Service",
      rating: 3,
      comment: "Food was okay but coffee was cold. Service was friendly though.",
      time: "2 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FF</span>
                </div>
                <span className="text-xl font-bold">FeedbackFlow</span>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{orgInfo.logo}</span>
                <div>
                  <h2 className="font-semibold">{orgInfo.name}</h2>
                  <Badge variant="secondary" className="text-xs">
                    {orgInfo.type}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/form-builder">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Form
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">OA</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="forms" className="space-y-6">
          <TabsList>
            <TabsTrigger value="forms">Feedback Forms</TabsTrigger>
            <TabsTrigger value="responses">Recent Responses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Feedback Forms</CardTitle>
                    <CardDescription>
                      Manage your organization's feedback collection forms
                    </CardDescription>
                  </div>
                  <Link to="/form-builder">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Form
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackForms.map((form) => (
                    <div
                      key={form.id}
                      className={`p-4 border rounded-lg transition-all cursor-pointer ${
                        selectedForm === form.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedForm(form.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <MessageSquare className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{form.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{form.category}</span>
                              <span>•</span>
                              <span>{form.responses} responses</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                                {form.avgRating}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge 
                            variant={form.status === 'active' ? 'default' : 'secondary'}
                            className={form.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                          >
                            {form.status}
                          </Badge>
                          <div className="text-right text-sm text-gray-500">
                            <div>QR Scans: {form.qrScans}</div>
                            <div>Last: {form.lastResponse}</div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses">
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>
                  Latest responses from your feedback forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{feedback.form}</Badge>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{feedback.time}</span>
                      </div>
                      <p className="text-gray-700">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Detailed insights into your feedback performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Analytics charts coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Organization Branding</CardTitle>
                <CardDescription>
                  Customize your organization's appearance and branding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Name</label>
                      <Input value={orgInfo.name} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Type</label>
                      <Input value={orgInfo.type} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Color</label>
                    <div className="flex items-center space-x-4">
                      <Input value={orgInfo.primaryColor} className="max-w-32" />
                      <div 
                        className="w-12 h-12 rounded-lg border"
                        style={{ backgroundColor: orgInfo.primaryColor }}
                      ></div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
