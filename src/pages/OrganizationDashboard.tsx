import { useState, useEffect } from "react";
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
import axios from "axios";

const OrganizationDashboard = () => {
  const [selectedForm, setSelectedForm] = useState<number | null>(null);
  const [orgInfo, setOrgInfo] = useState({ name: '', type: '', primaryColor: '', logo: '' });
  const [stats, setStats] = useState([]);
  const [feedbackForms, setFeedbackForms] = useState([]);
  const [recentFeedback, setRecentFeedback] = useState([]);

  useEffect(() => {
    // Fetch organization info
    axios.get("/api/dashboard/org-info").then(res => setOrgInfo(res.data));

    // Fetch stats
    axios.get("/api/dashboard/stats").then(res => setStats(res.data));

    // Fetch feedback forms
    axios.get("/api/dashboard/forms").then(res => setFeedbackForms(res.data));

    // Fetch recent feedback
    axios.get("/api/dashboard/recent-feedback").then(res => setRecentFeedback(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <Badge variant="secondary" className="text-xs">{orgInfo.type}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/form-builder">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" /> Create Form
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">OA</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

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
                    <CardDescription>Manage your organization's feedback collection forms</CardDescription>
                  </div>
                  <Link to="/form-builder">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Plus className="h-4 w-4 mr-2" /> Create New Form
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackForms.map((form) => (
                    <div key={form._id} className={`p-4 border rounded-lg transition-all cursor-pointer ${selectedForm === form._id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`} onClick={() => setSelectedForm(form._id)}>
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
                                <Star className="h-3 w-3 text-yellow-400 mr-1" /> {form.avgRating}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={form.status === 'active' ? 'default' : 'secondary'} className={form.status === 'active' ? 'bg-green-100 text-green-700' : ''}>{form.status}</Badge>
                          <div className="text-right text-sm text-gray-500">
                            <div>QR Scans: {form.qrScans}</div>
                            <div>Last: {form.lastResponse}</div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm"><QrCode className="h-4 w-4" /></Button>
                            <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                            <Button variant="outline" size="sm"><Copy className="h-4 w-4" /></Button>
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
                <CardDescription>Latest responses from your feedback forms</CardDescription>
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
                              <Star key={i} className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
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
                <CardDescription>Detailed insights into your feedback performance</CardDescription>
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
                <CardDescription>Customize your organization's appearance and branding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Name</label>
                      <Input value={orgInfo.name} readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Type</label>
                      <Input value={orgInfo.type} readOnly />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Color</label>
                    <div className="flex items-center space-x-4">
                      <Input value={orgInfo.primaryColor} className="max-w-32" readOnly />
                      <div className="w-12 h-12 rounded-lg border" style={{ backgroundColor: orgInfo.primaryColor }}></div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Save Changes</Button>
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
